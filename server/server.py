#! /usr/bin/python

import os.path
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import RPi.GPIO as GPIO

from neopixel import *

import Adafruit_MCP9808.MCP9808 as MCP9808
import Adafruit_TCS34725
import smbus

import time
import argparse
import signal
import sys
import json
import pwd
import grp
import os
import subprocess

from font import font

#
# Call Parameter Arguments
# 1. : led matrix size in x axis / number >= 7
# 2. : led matrix size in y axis / number >= 7
# 3. : number of empty led in x axis (at the end of a row) / number
# 4. : font type / string 5x7 or 8x12
# 5. : led stripe type / number 0 : WS2811_STRIP_GRB / 1 : SK6812_STRIP_GRBW
#
# possible usage:
# sudo python server.py 7 7
# sudo python server.py 8 8 1
# sudo python server.py 12 12 1 8x12
# sudo python server.py 12 12 1 8x12 1
#

#Initialize WS2812 LED's
LED_COUNT_MIN  = 7 # minimal Number of LED pixels in x/y direction.

# LED strip configuration:
if len(sys.argv) > 1:
    if (int(sys.argv[1]) < LED_COUNT_MIN):
        LED_COUNT_X    = LED_COUNT_MIN
    else:
        LED_COUNT_X    = int(sys.argv[1])
    if (int(sys.argv[2]) < LED_COUNT_MIN):
        LED_COUNT_Y    = LED_COUNT_MIN
    else:
        LED_COUNT_Y    = int(sys.argv[2])
else:
    # default is the minimal setup of 7x7 without any empty led
    LED_COUNT_X    = LED_COUNT_MIN # Number of LED pixels in x direction.
    LED_COUNT_Y    = LED_COUNT_MIN # Number of LED pixels in y direction.

if len(sys.argv) > 2:
    # enter number of empty led per row
    LED_COUNT_E    = int(sys.argv[3])
else:
    # default is the minimal setup of 7x7 without any empty led
    LED_COUNT_E    = 0 # Number of empty LED pixels in each line.

LED_COUNT_X_E  = LED_COUNT_X + LED_COUNT_E
LED_COUNT_X_1  = LED_COUNT_X - 1
LED_COUNT_Y_1  = LED_COUNT_Y - 1
LED_COUNT      = LED_COUNT_X * (LED_COUNT_Y + LED_COUNT_E)      # Total LED pixels on the stripe.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 5       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

if len(sys.argv) > 4:
    # enter 0 for WS2811_STRIP_GRB or 1 for SK6812_STRIP_GRBW led strip type
    if (int(sys.argv[5]) == 1):
        LED_STRIP      = ws.SK6812_STRIP_GRBW   # Strip type sk6812 and colour ordering
    else:
        LED_STRIP      = ws.WS2811_STRIP_GRB    # Strip type ws2811 and colour ordering
else:
    # default is the WS2811_STRIP_GRB led strip type
    LED_STRIP      = ws.WS2811_STRIP_GRB   # Strip type ws2811 and colour ordering

#Initialize the Font
if len(sys.argv) > 3:
    # enter string 5x7 or 8x12
    font = font(sys.argv[4])
else:
    # default is the minimal setup of 7x7 without any empty led
    font = font("5x7")

# Font configuration:
FONT_TUPLE_X   = 0       # Font tuple index for font x dimentions.
FONT_TUPLE_Y   = 1       # Font tuple index for font y dimentions.
FONT_TUPLE_CH  = 2       # Font tuple index for character data table.

FONT_SPACE_X   = 2       # Font character spacing pixels in x direction.
FONT_OFFSET_X  = font[FONT_TUPLE_X] + FONT_SPACE_X       	# Font offset between characters in LED pixels in x direction.
FONT_OFFSET_Y  = (LED_COUNT_Y - font[FONT_TUPLE_Y]) // 2	# Font offset from top of matrix in LED pixels in y direction.


#
# Draw Chars on NeoPixel Led Matrix
#
# - mounted as single strip/ starting on bottom right corner
# - may has empty leds, which look to the inside
# - led position increments from start to the end (0..sum-1 / including the empty leds)
#   sum = x * y + (y - 1) * e
#
# Example for a 7x7 Led Matrix with 1 Empty Led:
# |--L---L---L---L---L--...
# E
# |--L---L---L---L---L---L---L--|
#                               E
# |--L---L---L---L---L---L---L--|
# E
# |--L---L---L---L---L---L---L--<< start
#
# Character coordinates have its origin in top left corner
# |---->  x axis (0..n-1)
# |
# v
#   y axis (0..n-1)
#
class NeoPixelHandler:
    actTime = 0
    oldTime = 0
    message = ""
    i = FONT_OFFSET_X
    Red = 100
    Blue = 0
    Green = 0
    color = Color(50, 50, 0)

    def __init__(self):
        print ("neo pixel leds: ", LED_COUNT, " x: ", LED_COUNT_X, " y: ", LED_COUNT_Y, 
              " font x: ", font[FONT_TUPLE_X], " y: ", font[FONT_TUPLE_Y])


    def setPixel(self, x, y, color, strip):
        Pos = 0
        if (x in range(0, LED_COUNT_X)) and (y in range(FONT_OFFSET_Y, FONT_OFFSET_Y + LED_COUNT_Y)):
            if y%2:     #odd y lines
                #Pos = ((y + 1) * 7) - x - 1	# stripe starts at top left (from front)
                Pos =  (LED_COUNT_Y_1 - y) * LED_COUNT_X_E + LED_COUNT_X_1 - x	# stripe starts at bottom right (from front)
            else:       #even y lines
                #Pos = (y * 7) + x				# stripe starts at top left (from front)
                Pos =  (LED_COUNT_Y_1 - y) * LED_COUNT_X_E + x	# stripe starts at bottom right (from front)
            strip.setPixelColor(Pos, color)

    def drawChar(self, char, xPos, yPos):
        charNumb = ord(char) - 32
        charPos = 0

        for x in range(font[FONT_TUPLE_X]):	# loop over x direction
            for y in range(font[FONT_TUPLE_Y]):	# loop over y direction
                charPos = (charNumb * font[FONT_TUPLE_X]) + x	# character position in font table
                if font[FONT_TUPLE_CH][charPos] & 1<<y:
                    self.color = Color(self.Red, self.Green, self.Blue)
                    pixel.setPixel(x + xPos, y + yPos, self.color, strip)

    def printString(self):
        messageList = list(self.message)
        messageLength = len(messageList)

        self.actTime = time.time() * 1000
        if (self.actTime - self.oldTime) > 250:
            self.oldTime = self.actTime
            self.clearStrip()
            if self.i in range((-(FONT_OFFSET_X)) * messageLength, FONT_OFFSET_X + 1):
                for j in range(0, messageLength):
                    self.drawChar(messageList[j], self.i + (j * FONT_OFFSET_X), FONT_OFFSET_Y)
                strip.show()
                self.i -= 1
            else:
                self.i = FONT_OFFSET_X


    def clearStrip(self):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(0, 0, 0))
        strip.show()


#
# Read out sensors: color sensor / temperature sensor / touch sensor
#
class SensorHandler:
    sensor_temp = None
    sensor_tcs = None
    temperature = 0
    r, g, b, c = [0,0,0,0]
    color_temp = 0
    lux = 0

    def __init__(self):
        self.sensor_temp = MCP9808.MCP9808() # Start Temp Sensor
        self.sensor_temp.begin() # Initialize

        # Color Sensor instance with default integration time (2.4ms) and gain (4x).
        self.sensor_tcs = Adafruit_TCS34725.TCS34725()

    def temp(self):
        self.temperature = self.sensor_temp.readTempC()

    def color(self):
        self.r, self.g, self.b, self.c = self.sensor_tcs.get_raw_data() # Read the R, G, B, C color data.
        self.color_temp = Adafruit_TCS34725.calculate_color_temperature(self.r, self.g, self.b) # Calculate color temperature using utility functions.
        self.lux = Adafruit_TCS34725.calculate_lux(self.r, self.g, self.b) # Calculate lux with another utility function.

    def update(self):
        self.temp()
        self.color()

#
#
# commandHandler -
#

class commandHandler:
    text_loop = None
    code_loop = None

    def sortData(self, message):
        if self.text_loop is not None: self.text_loop.stop()
        if self.code_loop is not None:
            self.code_loop.kill()
            print "Terminated: " + str(self.code_loop.pid) + " Exit state: " + str(self.code_loop.poll())

        msg = json.loads(message)
        if msg["name"] == 'text': self.msgText(msg["value"])
        if msg["name"] == 'code': self.msgCode(msg["value"])

    def msgText(self, msg):
        # Protect from Crash for now.
        if self.code_loop is None:
            self.text_loop = tornado.ioloop.PeriodicCallback(pixel.printString, 50)
            self.text_loop.start()

        # create text
        self.setBrightness(int(msg["brightness"] or 25))

        self.setColor("Red", int(msg["red"] or 25))
        self.setColor("Green", int(msg["green"] or 25))
        self.setColor("Blue", int(msg["blue"] or 25))

        self.setText(msg["text"])

    def msgCode(self, msg):
        if self.text_loop is not None: self.text_loop.stop()
        file = open("custom.py","w")
        file.write(msg.encode('ascii', 'replace').replace(chr(63), chr(32)))
        file.close()
        os.chown("custom.py", pwd.getpwnam("pi").pw_uid, grp.getgrnam("pi").gr_gid)
        self.code_loop = subprocess.Popen(["sudo", "python", "custom.py"])
        print "Subprocess launched with PID: " + str(self.code_loop.pid)

    def setBrightness(self, val):
        # protect from overflow and scale brightness from 0-100 to 0-255
        brightness = int((int(val) * 2.55) if int(val) < 100 else 255)
        strip.setBrightness(brightness)

    def setColor(self, color, val):
        val = val if val > 0 else 0
        val = val if val != '' else 0
        setattr(pixel, color, val)

    def setText(self, val):
        for ch in val:
            chVal = (ord(ch))
            # check if current character is not on font table
            if ((chVal - 32) > (len(font[FONT_TUPLE_CH]) / font[FONT_TUPLE_X])):
                # check for different special chars in German Language and replace them
                if ((192 <= chVal) and (chVal <= 198)):
                    newCh = 'A'
                elif ((200 <= chVal) and (chVal <= 203)):
                    newCh = 'E'
                elif ((210 <= chVal) and (chVal <= 214)):
                    newCh = 'O'
                elif ((217 <= chVal) and (chVal <= 220)):
                    newCh = 'U'
                elif ((224 <= chVal) and (chVal <= 230)):
                    newCh = 'a'
                elif ((232 <= chVal) and (chVal <= 235)):
                    newCh = 'e'
                elif ((242 <= chVal) and (chVal <= 246)):
                    newCh = 'o'
                elif ((249 <= chVal) and (chVal <= 252)):
                    newCh = 'u'
                else:
                    newCh = '_'  # all unknown characters

                val = val.replace(ch, newCh)

        pixel.message = val


#
#
# Tornado Web Server
#

#Tornado Folder Paths
PORT = 80 #Tonado server port
settings = dict(
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    static_path = os.path.join(os.path.dirname(__file__), "static")
    )


# Tornado HTTP Handlers
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        print "[HTTP](MainHandler) User Connected."
        self.render("index.html")


# Tornado Websocket Handlers
class WSHandler(tornado.websocket.WebSocketHandler):
    comHandler = commandHandler()
    msg_temp_loop = None
    msg_color_loop = None

    def open(self):
        print '[WS] Connection was opened.'
        self.msg_temp_loop = tornado.ioloop.PeriodicCallback(self.msg_temp, 200)
        self.msg_temp_loop.start()
        self.msg_color_loop = tornado.ioloop.PeriodicCallback(self.msg_color, 200)
        self.msg_color_loop.start()

    def on_message(self, message):
    	print '[WS] Incoming message:', message.encode('utf-8')
    	self.comHandler.sortData(message)

    def on_close(self):
        print '[WS] Connection was closed.'
        self.msg_temp_loop.stop()
        self.msg_color_loop.stop()

    def msg_temp(self):
        self.write_message(json.dumps({
            'name' : 'temp',
            'value' : sensors.temperature
        }))

    def msg_color(self):
        self.write_message(json.dumps({
            'name' : 'color',
            'value' : {
                'r' : sensors.r,
                'g' : sensors.g,
                'b' : sensors.b,
                'c' : sensors.c,
                'temp' : sensors.color_temp,
                'lux' : sensors.lux
            }
        }))


application = tornado.web.Application([
    (r'/', MainHandler),
    (r'/ws', WSHandler),
    ], **settings)


# Main Server Start
if __name__ == "__main__":
    try:
        http_server = tornado.httpserver.HTTPServer(application)
        http_server.listen(PORT)
        main_loop = tornado.ioloop.IOLoop.instance()
        print "Tornado Server started"

        # Create NeoPixel object with appropriate configuration.
        strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
        strip.begin() # Intialize the library (must be called once before other functions).
        print "LED strip started"

        # Initialize neopixel
        pixel = NeoPixelHandler()

        # Initialize sensors
        sensors = SensorHandler()
        print "Sensors started"

        # Sensor Loop
        sensor_loop = tornado.ioloop.PeriodicCallback(sensors.update, 200)
        sensor_loop.start()

        main_loop.start()

    except:
        print "Exception triggered - Tornado Server stopped."
        raise
        # sys.exit()

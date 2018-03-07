#! /usr/bin/python

import os.path
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web


import time
import argparse
import signal
import sys
import json
import pwd
import grp
import os
import subprocess


#
#
# Tornado Web Server
#

#Tornado Folder Paths
settings = dict(
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    static_path = os.path.join(os.path.dirname(__file__), "static")
    )


# Tornado HTTP Handlers
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        print "[HTTP](MainHandler) User Connected."


# Tornado Websocket Handlers
class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print '[WS] Connection was opened.'
        self.msg_temp_loop = tornado.ioloop.PeriodicCallback(self.msg_temp, 200)
        self.msg_temp_loop.start()
        self.msg_color_loop = tornado.ioloop.PeriodicCallback(self.msg_color, 200)
        self.msg_color_loop.start()

    def on_message(self, message):
    	print '[WS] Incoming message:', message.encode('utf-8')

    def on_close(self):
        print '[WS] Connection was closed.'
        self.msg_temp_loop.stop()
        self.msg_color_loop.stop()

    def msg_temp(self):
        self.write_message(json.dumps({
            'name' : 'temp',
            'value' : time.time()%100
        }))

    def msg_color(self):
        self.write_message(json.dumps({
            'name' : 'color',
            'value' : {
                'r' : 55,
                'g' : 66,
                'b' : 77,
                'c' : time.time(),
                'temp' : time.time(),
                'lux' : time.time()%1000
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
        http_server.listen(80)
        main_loop = tornado.ioloop.IOLoop.instance()
        print "Tornado Server started"

        main_loop.start()

    except:
        print "Exception triggered - Tornado Server stopped."
        raise

You can find the documenttion about the React App below.

This is the Python Server.

## Setup

Start the server on the raspberry pi using `sudo python server.py`.

This will set the number of LEDs to a 8x8 matrix.
If you want to change this, you can pass x and y as arguments (x and y >= 7).
Example: `sudo python server.py 8 8`
-> See server.py for more detailed arguments

If you want to configure the server for autostart, use the `/etc/rc.local` file and put there a line like `python <path to server.py>`.

## Sensor Libraries:

https://learn.adafruit.com/mcp9808-temperature-sensor-python-library/software (Installation)

https://github.com/adafruit/Adafruit_Python_MCP9808

https://github.com/adafruit/Adafruit_Python_TCS34725

## Front-end

This project is setup using [create-react-app](https://github.com/facebook/create-react-app). It comunicates with the server using websockets.

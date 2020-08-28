# MMM-Page-Pusher
A module for magic mirror that uses 2 HCSR04 sensors to enable switching between pages

I kept on running into errors with existing modules that provide a swiping function, so I decided to try building my own similar functionality, but instead of swiping it uses a push gesture. 

### How it works
Node helper gets the data from the sensors every second via a python script. When you 'push' towards one of the sensors it sends a socket notification to MMM-Pages (https://github.com/edward-shen/MMM-pages). My MM uses a HCSR501 sensor to turn off the display when no-one is in front of it. When the display is turned off, the python script that gets that data from the HCSR04 sensors stops. When the display is activared, the script fires up again. This currently works with MMM-PIR-Sensor (https://github.com/paviro/MMM-PIR-Sensor). 

### Future improvements
- Right now it only switches between 2 pages (page 0 and 1), in future it should be able to switch to more pages. 

### MagicMirror² Example Configuration
To use this module, add the following configuration block to the modules array in the config/config.js file:
```js
var config = {
    modules: [
        ...
        {
            module: "MMM-Page-Pusher",
            config: 
                leftPinTrigger: 23 
                leftPinEcho: 24, 
                rightPinTrigger: 20, 
                rightPinEcho: 21, 
                debug: false, 
                threshold: 20,
                pirSensor: true,
            }
        },
        ...
    ]
}
```

### Configuration options

| Option             | Type               | Default Value            | Description |
| ------------------ | ------------------ | ------------------------ | --------- |
| `leftPinTrigger`   | `int`              | `23`                     | GPIO pin location of the trigger of the sensor that will be on the left |
| `leftPinEcho`      | `int`              | `24`                     | GPIO pin location of the echo of the sensor that will be on the left |
| `rightPinTrigger`  | `int`              | `20`                     | GPIO pin location of the trigger of the sensor that will be on the right |
| `rightPinEcho`     | `int`              | `21`                     | GPIO pin location of the echo of the sensor that will be on the left |
| `debug`.           | `boolean`          | `false`                  | Enables extra loggin feature (distance measured by sensors) |
| `threshold`        | `int`              | `20`                     | Distance at which a push should be registered. Default is 20 cm, so if your hand is closer than 20 cm to the sensor, it will register it as a 'push' |
| `pirSensor`        | `boolean`          | `false`                  | If you are using MMM-PIR-Sensor with MMM-PIR-Sensor (https://github.com/paviro/MMM-PIR-Sensor) this will pause stop the script when your display is off and start it again if motion is detected and the screen is turned back on. Saves energy :) |

### Thank you
I got the idea from MMM-Simple-Swiper (https://github.com/Bee-Mar/MMM-Simple-Swiper) and MMM-Swipe (https://github.com/mochman/MMM-Swipe). I referred MMM-ArduPort (https://github.com/Dentrax/MMM-ArduPort) for the communication between the python script and node_helper. The python script was based on https://tutorials-raspberrypi.com/raspberry-pi-ultrasonic-sensor-hc-sr04/. 

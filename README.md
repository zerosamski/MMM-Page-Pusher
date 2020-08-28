# MMM-Page-Pusher
A module for magic mirror that uses 2 HCSR04 sensors to enable switching between pages

I kept on running into errors with existing modules that provide a swiping function, so I decided to try building my own similar functionality, but instead of swiping it uses a push gesture. 

<b>Current status</b>
- node_helper is getting the sensor data via the python script
- GPIO pin numbers configurable using MM's config.js 
- when a push is occuring it sends a socket notification to MMM-Pages (https://github.com/edward-shen/MMM-pages) 

<b>Currently working on</b>
- My MM uses a HCSR501 sensor to turn off the display when no-one is in front of it. Ideally, when the display is turned off, the python script that gets that data from the HCSR04 sensors should pause. When the display is activared, the script should fire up again. 

<b>MagicMirror² Example Configuration</b>

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
                debug: false 
                threshold: 20 
            }
        },
        ...
    ]
}
```

<b>Configuration options</b>

| Option             | Type               | Default Value            | Description |
| ------------------ | ------------------ | ------------------------ | --------- |
| `leftPinTrigger`   | `int`              | `23`                     | GPIO pin location of the trigger of the sensor that will be on the left |
| `leftPinEcho`      | `int`              | `24`                     | GPIO pin location of the echo of the sensor that will be on the left |
| `rightPinTrigger`  | `int`              | `20`                     | GPIO pin location of the trigger of the sensor that will be on the right |
| `rightPinEcho`     | `int`              | `21`                     | GPIO pin location of the echo of the sensor that will be on the left |
| `debug`.           | `boolean`          | `false`                  | Enables extra loggin feature (distance measured by sensors) |
| `threshold`        | `int`              | `20`                     | Distance at which a push should be registered. Default is 20 cm, so if your hand is closer than 20 cm to the sensor, it will register it as a 'push' |

# MMM-Page-Pusher
A module for magic mirror that uses 2 HCSR04 sensors to enable switching between pages

I kept on running into errors with existing modules that provide a swiping function, so I decided to try building my own similar functionality, but instead of swiping it uses a push gesture. 

<b>Current status</b>
- node_helper is getting the sensor data via the python script
- GPIO pin numbers configurable using MM's config.js 

<b>Currently working on</b>
- determining when a push is occuring and sending socket notification to MMM-Pages (https://github.com/edward-shen/MMM-pages) 

<b>Future improvement ideas </b>
- My MM uses a HCSR501 sensor to turn off the display when no-one is in front of it. Ideally, when the display is turned off, the python script that gets that data from the HCSR04 sensors should pause. When the display is activared, the script should fire up again. 

<b>MagicMirror² Configuration</b>

To use this module, add the following configuration block to the modules array in the config/config.js file:
```js
var config = {
    modules: [
        ...
        {
            module: "MMM-Page-Pusher",
            config: 
                leftPinTrigger: 23 // Default value: 23 (GPIO numbering)
                leftPinEcho: 24, // Default value: 24 (GPIO numbering)
                rightPinTrigger: 20, // Default value: 20 (GPIO numbering)
                rightPinEcho: 21, // Default value: 21 (GPIO numbering)
                threshold: 20 // at what distance the program considers a 'push' to occur
            }
        },
        ...
    ]
}
```

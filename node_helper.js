const NodeHelper = require('node_helper');
const {PythonShell} = require('python-shell');
const exec = require('child_process').exec;
var debug;
var threshold;
var pirSensor;
var isRunning = false;

module.exports = NodeHelper.create({
    
    start:function() {
	console.log("Starting node_helper for module [" + this.name + "]");
    },
    
    //this function executes the pythron script and sends notifications for page changes
    python_start: function(payload) {
	isRunning = true;
	const self = this;
	const pyshell = new PythonShell('modules/' + this.name +'/swiper.py', {mode: 'json', stderrParser: (line) => JSON.stringify(line), pythonOptions: ['-u'], args: [JSON.stringify(this.config)]});
	    
	pyshell.on('message', function(message) {
	    try{
		//if pinSensor is true this will check if the display is off, in which case it will kill the script
		if(pirSensor) {
		    exec("/usr/bin/vcgencmd display_power").stdout.on('data', function(data) {
			if(data.indexOf("display_power=0") === 0) {
			    pyshell.kill();
			    isRunning = false;
			}
		    })
		}
	    
		if(message.hasOwnProperty('info') && debug) {
		    console.log(message.info)
		}
		
		if(message.hasOwnProperty('result')) {
		    if(debug) (console.log(message))
	    
		    data = message.result
		    left = parseFloat(data.left).toFixed(0)
		    right = parseFloat(data.right).toFixed(0)
		    
		    //calculate if page needs to be changed
		    if (left <= threshold && right >= threshold) {
			self.sendSocketNotification("PAGE_CHANGED", 0);
			if(debug) (console.log("DECREMENT PAGE"))
		    } else if (left >= threshold && right <= threshold) {
			self.sendSocketNotification("PAGE_CHANGED", 1);
			if(debug) (console.log("INCREMENT PAGE"))
		    }
		}
	    //catch exceptions
	    } catch (e) {
		console.log("Exception in Page Pusher: " + e);
	    }
	})
    },

    //set variables and call function to start the script
    socketNotificationReceived: function(notification, payload) {
        var self = this;
        if (notification === 'CONFIG') {
	    this.config = payload;
	    debug = payload["debug"];
	    threshold = payload["threshold"];
	    pirSensor = payload["pirSensor"];
	    this.python_start()
	}
	//check if script is not already running in case of PIR activity
	if (notification === "MOTION_DETECTED" && !isRunning) {
	    this.python_start()
	}
    }
 
})

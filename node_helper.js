const NodeHelper = require('node_helper');
const {PythonShell} = require('python-shell');
var debug;
var threshold;

module.exports = NodeHelper.create({
    
    start:function() {
	console.log("Starting node_helper for module [" + this.name + "]");
    },
    
    python_start: function() {
	const self = this;
	const pyshell = new PythonShell('modules/' + this.name +'/swiper.py', {mode: 'json', stderrParser: (line) => JSON.stringify(line), pythonOptions: ['-u'], args: [JSON.stringify(this.config)]});
	
	pyshell.on('message', function(message) {
	    
	    try{
	    
		if(message.hasOwnProperty('info')) {
		    console.log(message.info)
		}
		
		if(message.hasOwnProperty('result')) {
		    
		    if(debug) (console.log(message))
		
		    data = message.result
		
		    left = parseFloat(data.left).toFixed(0)
		    right = parseFloat(data.right).toFixed(0)
		    
		    if (left <= threshold && right >= threshold) {
			self.sendSocketNotification("PAGE_CHANGED", 0);
			console.log("DECREMENT PAGE")
		    } else if (left >= threshold && right <= threshold) {
			self.sendSocketNotification("PAGE_CHANGED", 1);
			console.log("INCREMENT PAGE")
		    }
		}
		//catch exception for unvalid JSON
	    } catch (e) {
		console.log("Exception in Page Pusher: " + e);
	    }
	})
	
	pyshell.end(function (err) {
            console.log("[" + self.name + "] " + 'finished running...');
        });
    
    },
    
    socketNotificationReceived: function(notification, payload) {
        var self = this;
        if (notification === 'CONFIG') {
	    this.config = payload;
	    debug = payload["debug"];
	    threshold = payload["threshold"];
	    }
	this.python_start();
	}
    
    
})

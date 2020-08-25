const NodeHelper = require('node_helper');
const {PythonShell} = require('python-shell');
var pythonStarted = false;

module.exports = NodeHelper.create({
    
    start:function() {
	console.log(this.consolePrefix + "Starting node_helper for module [" + this.name + "]");
	this.initialized = false;
	this.python_start();
    },
    
    python_start: function() {
	const self = this;
	const pyshell = new PythonShell('modules/' + this.name +'/swiper.py', {mode: 'text', pythonOptions: ['-u']});
	
	pyshell.on('message', function(message) {
	    console.log(message)
	})
	
	pyshell.end(function (err) {
            if (err) throw err;
            console.log("[" + self.name + "] " + 'finished running...');
        });
    
    }
    
    
})

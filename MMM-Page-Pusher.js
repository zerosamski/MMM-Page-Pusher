
"use strict";

Module.register("MMM-Page-Pusher", {
  
  defaults: {
    leftPinTrigger: 23,
    leftPinEcho: 24,
    rightPinTrigger: 20,
    rightPinEcho: 21,
    debug: false,
    threshold: 20,
    pirSensor: false,
  },

  start: function() {
    this.sendSocketNotification("CONFIG", this.config);
  },
    
  socketNotificationReceived: function(notification, payload) {
    this.sendNotification(notification, payload);
  },
  
  //if pinSensor is true and user presence is detected, this will send notification to node_helper to start up the script again
  notificationReceived: function(notification, payload) {
    if(notification === "USER_PRESENCE" && payload && this.config["pirSensor"]) {
      this.sendSocketNotification("MOTION_DETECTED");
    }
  },


});

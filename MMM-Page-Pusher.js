
"use strict";

Module.register("MMM-Page-Pusher", {
  
  defaults: {
    leftPinTrigger: 23,
    leftPinEcho: 24,
    rightPinTrigger: 20,
    rightPinEcho: 21,
    debug: false,
    threshold: 100,
    distDiff: 1.25,
  },

  start: function() {
    console.log("PAGEPUSHERERRRRR")
    this.sendSocketNotification("CONFIG", this.config);
  },
    
  socketNotificationReceived: function(notification, payload) {
    this.sendNotification(notification, payload);
    console.log("MMM-Page-Pusher: " + notficiation);
  },


});

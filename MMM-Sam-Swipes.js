
"use strict";

Module.register("MMM-Sam-Swipes", {
  
  defaults: {
    leftPinTrigger: 23,
    leftPinEcho: 24,
    rightPinTrigger: 20,
    rightPinEcho: 21,
  },

  start: function() {
    console.log("SWIPE SAM SWIPE")
    this.sendSocketNotification("CONFIG", this.config);
    
  
  },


});

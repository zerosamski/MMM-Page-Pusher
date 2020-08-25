
"use strict";

Module.register("MMM-Sam-Swipes", {

  start: function() {
    this.sendSocketNotification("START_SWIPING", this.config);
    console.log("SWIPE SAM SWIPE")
  },

  socketNotificationReceived: function(notification, payload) {
	  console.log("GOT NOTIFIEDDDDD" + payload)
    this.sendNotification(notification);
  },
});

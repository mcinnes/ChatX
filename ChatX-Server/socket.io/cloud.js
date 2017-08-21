Parse.Cloud.define("increaseUserCount", function(request, response) {
  var query = new Parse.Query("CurrentChats");
  query.equalTo("ChatRoomID", request.params.ChatRoomID);
  query.find({
    success: function(results) {
     results.increment("CurrentCount");
     results.save();
    },
    error: function() {
      response.error("adding failed");
    }
  });
});

Parse.Cloud.define("decreaseUserCOunt", function(request, response) {
  var query = new Parse.Query("CurrentChats");
  query.equalTo("ChatRoomID", request.params.ChatRoomID);
  query.find({
    success: function(results) {
     results.reduction("CurrentCount");
     results.save();
    },
    error: function() {
      response.error("reduction failed");
    }
  });
});

//Functions in Parse/htdocs/cloud.js

//Increase user count accessed at URL/function/increaseUserCount
Parse.Cloud.define("increaseUserCount", function(request, response) {
  //Select the table to query
  var query = new Parse.Query("CurrentChats");
  //Select row with the correct ID for the chat
  query.equalTo("ChatRoomID", request.params.ChatRoomID);
  query.find({
    success: function(results) {
      //Increment Count by 1
     results.increment("CurrentCount");
     results.save();
    },
    error: function() {
      response.error("increment failed");
    }
  });
});

//Increase user count accessed at URL/function/decreaseUserCount
Parse.Cloud.define("decreaseUserCount", function(request, response) {
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

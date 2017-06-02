var io = require("socket.io");  
var socket = io.listen(3000, "127.0.0.1");  
var people = {};  
var complete = "you stupid piece of shit";
var request = require('request');

socket.on("connection", function (client) {  
    client.on("join", function(name){

      
        client.join(client['roomNumber']);

        client.emit("update", "You have connected to the server.");
        socket.sockets.emit("update", name + " has joined the server.")
        socket.sockets.emit("update-people", people);

        //if user do normal stuff, else client.emit("unauth", "") then client.disconnect
    
        
    });

    client.on("send", function(msg){
        console.log('MSGRESULT: ' + msg['msg']);
        //Filter out user id and other info that doesnt need to be sent to the client
        socket.sockets.in('room1').emit("chat", msg);
        sendToDB(msg);

    });

    client.on("advertisment", function(msg){
         socket.sockets.emit("advertisment", msg);
    });
    client.on("image", function(msg){
         socket.sockets.emit("image", msg);
    });

    client.on("disconnect", function(){
        socket.sockets.emit("update", people[client.id] + " has left the server.");
        delete people[client.id];
        socket.sockets.emit("update-people", people);
    });
});

function verifyUser(data, callback){
//request data from server about logged in user


    request.get({
        url: "http://104.199.230.2/parse/users/me",
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
            //"X-Parse-Session-Token":data["session-token"]
        }
    }, function(error, response, body) {
        //return callback(body);
        //how the fuck do we call this back
        callback = "cunt";
        console.log("cunted");
    });


}

function sendToDB(data){
    request.post({
        url: "http://104.199.230.2/parse/classes/chat",
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
        },
        body: data
    }, function(error, response, body) {
    });
}
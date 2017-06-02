// attach Socket.io to our HTTP server
var socketio = require("socket.io");  
io = socketio.listen(3000, "127.0.0.1");
var request = require('request');

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('join', function(room) {
        socket.join(room["roomNumber"]);
    });

    socket.on("send", function(msg){
    //Filter out user id and other info that doesnt need to be sent to the client
    	io.sockets.in(msg['roomNumber']).emit("chat", msg);
    	sendToDB(msg);
	});

	socket.on("disconnect", function(){
      
    });

    socket.on("advertisment", function(msg){
    	io.sockets.in(msg['roomNumber']).emit("advertisment", msg);
    });
    socket.on("image", function(msg){
    	io.sockets.in(msg['roomNumber']).emit("image", msg);
    });
});


function sendToDB(data){
    request.post({
        url: "http://104.199.230.2/parse/classes/"+data['roomNumber'],
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
        },
        body: data
    }, function(error, response, body) {
    	console.log(body);
    });
}



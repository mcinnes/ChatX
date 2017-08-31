// attach Socket.io to our HTTP server
var socketio = require("socket.io");  
io = socketio.listen(3000, "127.0.0.1");
var request = require('request');
//eu*74tA3.QH;LjFg
// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('join', function(room) {

        //Client joins chat room from the string in room["roomNumber"]
        socket.join(room["roomNumber"]);

        //Increase the current user count per chat in the parse database
        increaseCount(room);

    });

    socket.on("send", function(msg){
        //Filter out user id and other info that doesnt need to be sent to the client
    	io.sockets.in(msg['roomNumber']).emit("chat", msg);
        //TODO: implement that stuff
        console.log(msg);
        //Save the message into the database
    	sendToDB(msg);
	});

	socket.on("disconnect", function(room){
      //remove user from the room
      decreaseCount(room);
      //decrease euser count of the room
    });

    socket.on("advertisment", function(msg){
        //send advertisment to specific room
    	io.sockets.in(msg['roomNumber']).emit("advertisment", msg);

        
    });
    socket.on("image", function(msg){
        //send image to specific room
    	io.sockets.in(msg['roomNumber']).emit("image", msg);
        //uploadImage(msg["image"]);
        //console.log(msg);
        sendToDB(msg);
    });
});

function increaseCount(data){
	request.put({
        //This url is wrong!
		url: "http://104.199.230.2/parse/classes/CurrentChats/"+data['roomID'],
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
        },
        body: {"CurrentCount":{"__op":"Increment","amount":1}}
    	}, function(error, response, body) {
    		console.log(body);
    });
}

function uploadImage(data){
     var dataToSubmit = {__ContentType : "image/jpeg", base64 : data};
 
    // First upload the image file
    request.post({
        url: "http://104.199.230.2/parse/files/image.jpg",
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"plain/text",
            "X-Parse-Session-Token":"r:2bd13b533beef317c2f97c836bd3aae4"
        },
        body: dataToSubmit
    }, function(error, response, body) {
        console.log("Repo: " + response);
    });
}
function decreaseCount(data){
    request.put({
        //This url is wrong!
        url: "http://104.199.230.2/parse/classes/CurrentChats/"+data['roomID'],
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
        },
        body: {"CurrentCount":{"__op":"Increment","amount":-1}}
        }, function(error, response, body) {
            console.log(body);
    });
}
function verifyUser(data, callback){
//request data from server about logged in user

    request.get({
        url: "http://104.199.230.2/parse/users/me",
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
            "X-Parse-Session-Token":"r:2bd13b533beef317c2f97c836bd3aae4"
        }
    }, function(error, response, body) {
       console.log(response + body);
        console.log(JSON.stringify(response, null, 4));
        console.log(JSON.stringify(body, null, 4));
    });
}

function sendToDB(data){
    request.post({
        url: "http://104.199.230.2/parse/classes/"+data['roomNumber'],
        json: true,
        headers: {
            "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
            "X-Parse-REST-API-Key": "cc8437b78d96a16a09d2a89badb84b7c19412d2a",
            "Content-Type":"application/json",
            "X-Parse-Session-Token":"r:2bd13b533beef317c2f97c836bd3aae4"
        },
        body: data
    }, function(error, response, body) {
    	console.log(body);
    });
}



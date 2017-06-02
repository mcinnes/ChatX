var http = require('http');
    // NEVER use a Sync function except at start-up!
require('fs');

// Send index.html to all requests
var app = http.createServer(function(req, res) {

  if(request.url === "/index"){
   fs.readFile("WebUI/index.html", function (err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
   });
}
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time every 10 secs
setInterval(sendTime, 10000);
/*
io.on( 'connection', function(socket) {

    console.log( "User connected..!" );

    socket.on( 'messages', function(data) {
        io.emit( 'New message: ' + data.message + "from");
        console.log( 'New message: ' + data.message + "from");
    });
}); */

function sendToDB(data){
var requestData = { "name":"John"};

var request = require('request');
        request({
            url: "http://104.199.230.2/parse/1/chat",
            json: true,
            headers: {
                "X-Parse-Application-Id": "ac300f8d17f1b7d1f01e251f091a8000d5aeb6b0",
                "X-Parse-REST-API-Key":"cc8437b78d96a16a09d2a89badb84b7c19412d2a",
                "Content-Type":"application/json",
            },
            body: JSON.stringify(requestData)
        }, function(error, response, body) {
            console.log(response);
        });
}

var clients = 0;
io.sockets.on('connection', function (socket) {
  ++clients;
  socket.emit('users_count', clients);   

  socket.on('disconnect', function () {
    --clients;
  });

  socket.on( 'messages', function(data) {
        io.sockets.send(data.username + ": " + data.message);
        //sendToDB("");
        console.log( 'New message: ' + data.message + "from");
    });
});

app.listen(3000);

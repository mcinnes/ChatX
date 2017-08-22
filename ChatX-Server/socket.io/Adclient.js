//client.js
var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:3000', {reconnect: false});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('advertisment', {"roomNumber":"ClqNenpVUUOrRUa","msg":"$4 coffee at Fusion for the next 40 minutes", "source":"FUSION Deakin"});

 socket.on("disconnect", function(){
        console.log("client disconnected from server");
 });

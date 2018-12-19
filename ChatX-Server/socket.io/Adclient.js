//Basic Demonstration of Advertisment being sent on the platform
var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:3000', {reconnect: false});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
//Send out advertisment to a specific room
socket.emit('advertisment', {"roomNumber":"xZhNseTPAwvsROs","msg":"$4 coffee at Fusion for the next 40 minutes", "source":"FUSION Deakin"});

//Disconnect after advertisment has gone out
socket.on("disconnect", function(){
        console.log("client disconnected from server");
 });

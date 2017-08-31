//client.js
var io = require('socket.io-client');
var socket = io.connect('10.0.0.9:3000', {reconnect: false});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');

    for (var i = 0; i >= 200; i++) {
	sleep(1000);
	socket.emit('chat', {"roomNumber":"QGonksOFHyNWvuv","msg":"demo","name":"kBO3saH3wG","nickname":"Bradley","userId":"kBO3saH3wG"});
	console.log('sent');
}
});



 socket.on("disconnect", function(){
        console.log("client disconnected from server");
 });

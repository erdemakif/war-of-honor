var http = require('http')
var sio = require('socket.io')

var server = http.createServer( function(req, res){
	console.log(Math.random());
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("it works! :D");
});

server.listen(8000);

var socket = sio.listen(server);
socket.on('connection', function(s){
	console.log("samsing heppind");
});


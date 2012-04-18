var http = require('http')
	sio = require('socket.io')
	fs = require('fs')
	static = require('node-static');

/*var decision = ["take my money", "I surrender take my life", "I see dead people"];
var requests = 0;
*/

var clientFiles = new static.Server('./client');

var server = http.createServer( function(req, res){
	req.addListener('end', function () {
		clientFiles.serve(req, res);
  	});
});

server.listen(8000);

var socket = sio.listen(server);
socket.sockets.on('connection', function (s) {
	console.log("Socket connected: " + s.id);

  	s.on('message', function (data) {
    	
  	});
  	s.on('request', function (req) {
  		console.log("a " + req + " pushed the button.");
  	});

  	s.on("browser_info", function(info){
  		//here what to do with coming client's info
  		console.log(info);
  	});
});
socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//measurement
//setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
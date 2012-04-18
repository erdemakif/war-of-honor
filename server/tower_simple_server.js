var http = require('http')
	sio = require('socket.io')
	fs = require('fs')
	static = require('node-static');

var clientFiles = new static.Server('./client');

var server = http.createServer( function(req, res){
	req.addListener('end', function () {
		clientFiles.serve(req, res); //this will send all files in ./client folder to the client
  	});
});

server.listen(8000); //listening port 8000

var socket = sio.listen(server);
socket.sockets.on('connection', function (s) {

  	s.on('message', function (data) {
    	console.log(data);
  	});

  	s.on("browser_info", function(info){
  		//here what to do with coming client's info
  		console.log("Socket info: "+ s.id + " is  a " + info);
  	});

});
socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//measurement
//setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
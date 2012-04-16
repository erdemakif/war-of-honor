var http = require('http')
	sio = require('socket.io')

var msg = "hey browser wassup"
var decision = ["take my money", "I surrender take my life", "I see dead people"];
var requests = 0;

var server = http.createServer( function(req, res){
	console.log(Math.random());
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("it works! :D");
});

server.listen(8000);

var socket = sio.listen(server);
socket.sockets.on('connection', function (s) {
	console.log("Socket connected: " + s.id);
  	s.on('message', function (data) {
    	console.log(msg + " is changing to " +data);
    	msg = data;
  	});
  	s.on('request', function (req, res) {
		if(req.request === "your money or your life"){
			dec = decision[Math.round(Math.random()*2)];
			console.log("requested: " + req.request + "returned decision: "+ dec);
			res(dec);
			requests++;
		}
  	});
  	s.emit("message", msg);
});
socket.sockets.on('disconnect', function (s){
	console.log(s);
});

setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
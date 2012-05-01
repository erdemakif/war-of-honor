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

userInfo = {};
sessions = {};


var socket = sio.listen(server);
socket.sockets.on('connection', function (s) {

  	s.on('moregold', function(){
  		if(sessions[s.id]){
  			if(userInfo[sessions[s.id].username]) userInfo[sessions[s.id].username].gold++;	
  		}
  		
  	});

	s.on('login', function (data) {
  		if(!userInfo[data.username])
	  		userInfo[data.username] = {gold:0};	
  		sessions[s.id] = {sId:s.id, username:data.username, pass:data.pass};
	});

	s.on("browser_info", function(info){
		//here what to do with coming client's info
		console.log("Socket info: "+ s.id + " is  a " + info);
	});

});

setInterval( function(){socket.sockets.emit("gold", userInfo)} , 1000);

socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//measurement
//setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
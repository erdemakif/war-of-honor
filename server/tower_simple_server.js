var http = require('http');
	sio = require('socket.io');
	fs = require('fs');
	static = require('node-static');
	redis = require('redis');

var db = redis.createClient(); //no port spesified meaning both redis and node working locally
var dbUSERS = "USERS";
var dbSESSIONS = "SESSIONS";
var dbSTATS = "STATS";

var clientFiles = new static.Server('./client');

var server = http.createServer( function(req, res){
	req.addListener('end', function () {
		clientFiles.serve(req, res); //this will send all files in ./client folder to the client
  	});
});

server.listen(8000); //listening port 8000

var socket = sio.listen(server);
socket.set("origins = *:*"); //to solve: Origin null is not allowed by Access-Control-Allow-Origin. |||NO SUCCESS|||
socket.sockets.on('connection', function (s) {

  	s.on('moregold', function(){
  		//db.hget(dbUSERS, )

  		/*if(sessions[s.id]){
  			if(userInfo[sessions[s.id].username]) userInfo[sessions[s.id].username].gold++;	
  		}*/
  		
  	});

	s.on('login', function (data) {
		//todo: can be changed with hsetnx (checks before putting if there is a field)
		db.hget(dbUSERS, data.username, function(err, res){ 
			console.log("err: "+err + " res: "+ res);
			if(!res){
				db.hset(dbUSERS, data.username, 
					{gold:0, pass:data.pass, activeSessionID:data.id}, 
					function(err2, set_res){ console.log("err: "+err2 + " res: "+ set_res);});
			}
		}); //if new user
			
		/*
  		if(!userInfo[data.username])
	  		userInfo[data.username] = {gold:0};	
  		sessions[s.id] = {sId:s.id, username:data.username, pass:data.pass};
  		*/
	});

	s.on("browser_info", function(info){
		//here what to do with coming client's info -- just for stats
		db.rpush(dbSTATS, info, console.log("client connected: "+ info));
		//console.log("Socket info: "+ s.id + " is  a " + info);
	});

});

function broadcastGolds(){
	//can be improved too complex


	//console.log("golds sent!");
}

setInterval( broadcastGolds, 1000);

socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//measurement
//setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
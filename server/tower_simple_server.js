var http = require('http');
	sio = require('socket.io');
	fs = require('fs');
	static = require('node-static');
	redis = require('redis');
	async = require('async');

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
  		db.hget(dbSESSIONS, s.id, function(err, res){
  			db.hincrby(res, "gold", 1);
  		});

  		/*if(sessions[s.id]){
  			if(userInfo[sessions[s.id].username]) userInfo[sessions[s.id].username].gold++;	
  		}*/
  		
  	});
  	

	s.on('login', function (data) {
		//todo: can be changed with hsetnx (checks before putting if there is a field)
		db.hsetnx(data.username, "gold", 0, function(err, res){
			db.hset(data.username, "pass", data.pass);
			db.hset(data.username, "activeSessionID", s.id);
			console.log("success" , res);
		});
		db.sadd(dbUSERS, data.username);
		
		db.hset(dbSESSIONS, s.id, data.username);
		/*
  		if(!userInfo[data.username])
	  		userInfo[data.username] = {gold:0};	
  		sessions[s.id] = {sId:s.id, username:data.username, pass:data.pass};
  		*/
	});

	s.on("browser_info", function(info){
		//here what to do with coming client's info -- just for stats
		//stats can be in another redis server?
		db.rpush(dbSTATS, info, console.log("client connected: "+ info));
		//console.log("Socket info: "+ s.id + " is  a " + info);
	});

});

goldBroadcaster = db.multi();
goldBroadcaster.smembers(dbUSERS, function(err, res){
	goldGetter = db.multi();
	for (var i=0; i<res.length; i++){
		goldGetter.hget(res[i], "gold");
	}
	goldGetter.exec(function(err, replies){
		response = [];
		for (var i=0; i<res.length; i++){
			response.push({user:res[i], gold:replies[i]});
		}
		socket.sockets.emit("golds", response);
	});
});
function broadcastGolds(){
	goldBroadcaster.exec(function(err,replies){});
}

setInterval( broadcastGolds, 1000);

socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//SAVE_DB
//do something rather than printing if an error occurs
//asynchronously save db to disk each 10mins
setInterval(function(){ db.bgsave(function(err){if(err){console.log(err);}}); }, 600000); 
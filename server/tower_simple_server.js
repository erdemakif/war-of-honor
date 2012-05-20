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
  		/*db.hget(dbSESSIONS, s.id, function(err, res){
  			db.hget(d)
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

function broadcastGolds(){
	
	db.smembers(dbUSERS, function(err, res){
		async.map(res,
			db.hkeys,
			function(err, res){
				console.log(res);
				socket.sockets.emit("golds", res);
			}
		);
	});
	/*
	db.hvals(dbUSERS, function(err, res){
		var l = new Array();
		res.map(function(o){
			var obj = JSON.parse(o);
			l.push({user:obj.user, gold:obj.gold});
		});
		socket.sockets.emit("golds", l);
	});
	//console.log("golds sent!");*/
}

setInterval( broadcastGolds, 1000);

socket.sockets.on('disconnect', function (s){
	console.log(s);
});

//measurement
//setInterval(function(){ console.log("REQUESTS PER SECOND = "+ requests +" req/sec"); requests=0;}, 1000);
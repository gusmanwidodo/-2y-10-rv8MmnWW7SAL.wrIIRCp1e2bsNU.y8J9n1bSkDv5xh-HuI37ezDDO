var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");

	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	next();

});

app.get('/', function(req, res){

  	res.sendfile('index.html');

});

io.on('connection', function(socket){

  	console.log('a user connected');

  	socket.on('chat.message', function(message) {

        console.log(message);

        io.emit('chat.message', message);

        // client.set("message", message, redis.print);
    });

	socket.on('disconnect', function(){

		console.log('user disconnected');

	});

});

http.listen(3000, function(){

  	console.log('listening on *:3000');

});
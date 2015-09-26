var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var Server = require('./Server.js');

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

var gameServer = new Server();

io.on('connection', function (socket) {
    gameServer.userConnected();

    socket.broadcast.emit('user joined', {
        usersCount: gameServer.usersCount
    });

    socket.on('disconnect', function () {
        gameServer.userDisconnected();

        socket.broadcast.emit('user left', {
            usersCount: gameServer.usersCount
        });
    });
});
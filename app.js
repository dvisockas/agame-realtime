var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var Server = require('./Server.js');
var User = require('./User.js');

//Server config
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

//Game config
var gameServer = new Server();

io.on('connection', function (socket) {
    //User creates his account
    socket.on('login', function (username) {
        socket.currentUser = new User();
        socket.currentUser.username = username;

        gameServer.addUser(socket.currentUser);

        socket.broadcast.emit('user joined', {
            usersCount: gameServer.users.length
        });

        console.log("User " + socket.currentUser.username + " connected. Count: " + gameServer.users.length);
    });

    //User disconnects from game
    socket.on('disconnect', function () {
        gameServer.removeUser(socket.currentUser);

        socket.broadcast.emit('user left', {
            usersCount: gameServer.users.length
        });

        console.log("User " + socket.currentUser.username + " disconnected. Count: " + gameServer.users.length);
    });
});
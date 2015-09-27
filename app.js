var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 1234;
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

    socket.on('login', function (user) {
        socket.currentUser = new User();
        socket.currentUser = user;

        gameServer.addUser(user);

        socket.emit('active users', gameServer.users.filter(function (user) {
            return user.id !== socket.currentUser.id;
        }));

        socket.broadcast.emit('user joined', {
            user: socket.currentUser
        });
    });

    socket.on('disconnect', function () {
        if (socket.currentUser !== undefined) {
            gameServer.removeUser(socket.currentUser);

            socket.broadcast.emit('user left', {
                user: socket.currentUser
            });
        }
    });

    socket.on('location changed', function (user) {
        socket.currentUser = user;
        gameServer.updateUser(user);

        socket.broadcast.emit('user location changed', {
            user: socket.currentUser
        });
    });

    //socket.on('building built', function (building) {
    //    gameServer.addBuilding(building);
    //
    //    socket.broadcast.emit('user building built', {
    //        building: building
    //    });
    //});
    //
    //socket.on('building demolished', function (building) {
    //    gameServer.removeBuilding(building);
    //
    //    socket.broadcast.emit('user building demolished', {
    //        building: building
    //    });
    //});
});
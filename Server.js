var Server = function() {};

Server.prototype.usersCount = 0;

Server.prototype.userConnected = function() {
    this.usersCount++;

    console.log("User connected. Count: " + this.usersCount);
};

Server.prototype.userDisconnected = function() {
    this.usersCount--;

    console.log("User disconnected. Count: " + this.usersCount);
};

module.exports = Server;
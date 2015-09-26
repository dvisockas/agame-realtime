var Server = function() {};

Server.prototype.users = [];

Server.prototype.addUser = function(user) {
    this.users.push(user);
};

Server.prototype.removeUser = function(user) {
    var index = this.users.indexOf(user);
    if (index > -1)
        this.users.splice(index, 1);

    console.log(this.users);
};

module.exports = Server;
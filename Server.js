var Server = function() {};

Server.prototype.users = [];
Server.prototype.buildings = [];

Server.prototype.addUser = function(user) {
    this.users.push(user);
};

Server.prototype.removeUser = function(user) {
    var index = this.users.indexOf(user);
    if (index > -1)
        this.users.splice(index, 1);
};

Server.prototype.addBuilding = function(building) {
    this.buildings.push(building);
};

Server.prototype.removeBuilding = function(building) {
    var index = this.buildings.indexOf(building);
    if (index > -1)
        this.buildings.splice(index, 1);
};

module.exports = Server;
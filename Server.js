var Server = function () {
};

Server.prototype.users = [];
Server.prototype.buildings = [];

Server.prototype.addUser = function (user) {
    this.users.splice(user.id, 0, user);
};

Server.prototype.updateUser = function (user) {
    this.users[user.id] = user;
};

Server.prototype.removeUser = function (user) {
    this.users.forEach(function (u, i) {
        if (user.id == u.id)
            this.users.splice(u.id, 1);
    }, this);
};

//Server.prototype.addBuilding = function(building) {
//    this.buildings.push(building);
//};
//
//Server.prototype.removeBuilding = function(building) {
//    var index = this.buildings.indexOf(building);
//    if (index > -1)
//        this.buildings.splice(index, 1);
//};

module.exports = Server;
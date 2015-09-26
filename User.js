var User = function() {};

User.prototype.username = "";
User.prototype.location = {
    lat: null,
    lng: null
};

module.exports = User;
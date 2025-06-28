const userService = require('./userService');

const getUsers = function(done){
    userService.getUsers(done);
}

const getUserById = function(userId, done) {
    userService.getUserById(userId, done);
}

const updateUserdetails = function(userId, userName, done) {
    userService.updateUserdetails(userId, userName, done);
}

module.exports = { getUsers, getUserById, updateUserdetails };
const userDAO = require('./userDAO');

const getUsers = function(done) {
    userDAO.getUsers(done);
}

const getUserById = function(userId, done) {
    userDAO.getUserById(userId, done);
}

const updateUserdetails = function(userId, userName, done) {
    userDAO.updateUserdetails(userId, userName, done);
}

module.exports = {getUsers, getUserById, updateUserdetails}
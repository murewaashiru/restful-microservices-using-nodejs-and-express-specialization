const userDao = require('./userDAO');

//import dao layer
function findUser(email,done){
    userDao.findUser(email,done);
}

function registerUser(userData,done){
    userDao.registerUser(userData,done);
}


module.exports={
    findUser, registerUser
}
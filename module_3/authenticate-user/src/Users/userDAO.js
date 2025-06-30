const fs = require('fs');
const path = require('path');
const users = require('./users.json');

//Define the path to the users.json file
const filePath = path.join(__dirname, 'users.json');

//This method will findUser
function findUser(email,done){
    const userFetched = users.filter(user => user.email === email)[0];
    done(undefined, userFetched);
}

//This method will register user
function registerUser(userData, done) {
    users.push(userData);
    fs.writeFileSync(filePath, JSON.stringify(users))
    return done(undefined, userData)
}

module.exports = {
    findUser,registerUser
}
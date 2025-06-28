const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

const getUsers = function(done ){
    fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return done(`Encountered error while reading file: ${err.message}`);
    }
    let userData = JSON.parse(fileContent);
    return done(undefined, userData);
  });
}

const getUserById = function(userId, done) {
    const filePath = path.join(__dirname, 'users.json');
    fs.readFile(filePath, (err, fileContent)=>{
        if (err) {
            return done(`Encountered error while reading file: ${err.message}`);
        }
        let userData = JSON.parse(fileContent);
        const fetchedUser = userData.find(user => user.userId == userId);
        console.log(`The fetchedUser is ${fetchedUser}`)
        if (fetchedUser === undefined || fetchedUser.length === 0) {
            return done(`User with id ${userId} not found`);
        }
        return done(undefined, fetchedUser);
    });
}

const updateUserdetails = function(userId, userName, done) {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            return done(`Encountered error while getting users details: ${err.message}`);
        }
        let userData = JSON.parse(fileContent);
        let index = userData.findIndex(user => user.userId == userId);
        if (index === -1) {
            return done("No user found with the given ID");
        }
        userData[index].userName = userName;
        fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err, updateUserdetails)=>{
            if(err){
                return done(`Encountered error while updating user details: ${err.message}`);
            }
            return done(undefined, "successfully updated user details");
        })
    })
}

module.exports = { getUsers, getUserById, updateUserdetails }
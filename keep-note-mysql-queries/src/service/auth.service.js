const jwt = require('jsonwebtoken');
const config = require('../../config');


function verifyUser({user_id,password},userData){
   if(userData===undefined){
    return false
   }
   else {
     if(user_id === userData.user_id && password === userData)
     return true;
   }
}

//This function will create JWT token and return the token
// use the method jwt.sign having two parameters payload and Auth_Secret
function createToken(userdata) {
  //create payload
   const payload = {
    role:"USER",
    user_id:userdata.user_id,
    user_name:userdata.user_name
   }
   const token = jwt.sign(payload, config.AUTH_SECRET, {expiresIn:3600})
    return token;
  }


  module.exports={
     verifyUser,createToken
  }
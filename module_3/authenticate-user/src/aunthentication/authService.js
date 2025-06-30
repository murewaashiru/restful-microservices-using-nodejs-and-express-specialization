// const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../../config');

function getGithubAccessToken(code) {
//   const body={
//     client_id: config.CLIENT_ID,
//     client_secret: config.CLIENT_SECRET,
//     code
//   }; 
//   const opts = { Headers:{ accept: 'application/json'} };   
//   axios.post('https://github.com/login/oauth/access_token', body, opts)
//   .then(response => {response.data.access_token})
//   .then((token) => {
//     done(null, token);
//   })
//   .catch((error) => {
//     done({err:err.message});
//   });
}

//This function will verify email and password and will return true and false

function verifyUser({email,password},userData){
   if(userData===undefined){
    return false
   }
   else {
     if(email === userData.email && password === userData)
     return true;
   }
}

//This function will create JWT token and return the token
// use the method jwt.sign having two parameters payload and Auth_Secret
function createToken(userdata) {
  //create payload
   const payload = {
    role:"USER",
    email:userdata.email,
    name:userdata.name
   }
   const token = jwt.sign(payload, config.AUTH_SECRET, {expiresIn:3600})
    return token;
  }


  module.exports={
    getGithubAccessToken, verifyUser,createToken
  }
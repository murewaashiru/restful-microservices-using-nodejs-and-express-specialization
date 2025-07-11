const jwt = require('jsonwebtoken');
const config = require('../../config');
const { responseDto } = require('../dto/response');

//This function verifyToken will verify the token coming from headers 
const verifyToken = (req, res, next) => {
  // Getting the authorization header
  const token = req.headers["authorization"];
  if (!token){
    responseDto(res, 403, "44", "A token is required for authentication");
  }
 
  //Synchronously verify given token using a secret or a public key to get a decoded token 
  try{
    const decoded = jwt.verify(token, config.AUTH_SECRET)
    // console.log("Decoded Token: ", decoded);
    req.claims = decoded;
  }catch(err){
    console.log(`Token verification failed: , ${err.message}`);
    responseDto(res, 401, "44", `Invalid Token: ${err.message}`);
    return;
  }
  return next();
};

module.exports = verifyToken;
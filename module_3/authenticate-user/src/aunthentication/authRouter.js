const express = require('express');
const router = express.Router();
const authController = require('./authController');

//This method post will regiater the use
router.post('/register',(req,res)=>{
  try{
        //retrive name, email and password from request body
        const {name, email, password} = req.body;
        if(!(name && email && password)){
                return res.status(400).send("Required inputs are missing");
        }
        const userDetails = {
          name, email, password,
        }
        console.log(`User details to be registered: ${JSON.stringify(userDetails)}`);
        //calling authController registeruser method return the error msg or the result
        authController.registerUser(userDetails,(err,result)=>{
           if(err){
                console.log(`User already exists ${err}`);
                res.status(400).send("User already exists");
           } else{
                res.status(201).send(result)
           }
        })
  } catch(err){
        console.log(`Unexpected error while registering the user: ${err}`);
        res.status(400).send("Unexpected error while registering the user:");
  }
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
  try{
        const {email, password} = req.body;
        //check if email and password are present in the request body
        if(!(email && password)){
            return res.status(400).send("Email and password are required");
        }
      
        //calling the authController login usermethod return the error or the result 
        authController.loginUser({email,password},(err,result)=>{
           if(err){
               res.status(401).send("Invalid credentials");
           } else{
                res.status(200).send({STATUS:"OK", data:result});
           }
        })
  }catch(err){
     console.log(`Unexpected error while logging in the user: ${err}`);
    res.status(400).send("unxpected error while logging in the user");
  }
})

module.exports = router
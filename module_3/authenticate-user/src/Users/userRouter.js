const express = require('express');
const router = express.Router();
const userController = require('./userController');


//This get method will get the user with token
router.get('/',(req,res)=>{
        try{
                //retrive userdata from req claims
                const userdata = req.claims;
                console.log(`User data from claims: ${JSON.stringify(userdata)}`);
                if(!userdata.email){
                        return res.status(400).send("User email not available");
                }

                //Calling controller findUser method return the error or result
                userController.findUser(userdata.email,(err,result)=>{
                        if(err){
                                res.status(400).send(`Error getting the user details ${err}`);
                        } else{
                                res.status(200).send(result);
                        }
                })
        }catch(err){
                console.log(`Unexpected error while getting logged in user details: ${err}`);
                res.status(400).send("Unexpected error while getting logged in user details:");
        }
})


module.exports = router
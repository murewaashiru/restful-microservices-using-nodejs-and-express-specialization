const {Router} = require('express');
const express = require('express');
const routes = express.Router();
const userController = require('./userController');

routes.get('/', (req, res) => {
    try{
        userController.getUsers((err, users) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.status(200).send({status:"OK",data:users});
        });
    }catch(err){
        res.status(500).send({error: 'Try again after some time'});
    }
})

routes.get('/:userId', (req, res) => {
    try{
        const userId = req.params.userId; 
        userController.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({status:"OK",data:user});
        })
    }catch(err){
        res.status(500).send({error: 'Try again after some time'});
    }
})

routes.put('/:userId', (req, res) => {
    try{
        const userId = req.params.userId; 
        const userName = req.body.userName;
        userController.updateUserdetails(userId, userName, (err, user) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).send({status:"OK",data:user});
        })
    }catch(err){
        res.status(500).send({error: 'Try again after some time'});
    }
})
module.exports = routes;
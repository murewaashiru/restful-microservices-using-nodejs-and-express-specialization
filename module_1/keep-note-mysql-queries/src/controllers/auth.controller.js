const User = require('../dao/user.dao.js'); 

exports.login = (req, res) => {
    console.log("login called");
    const user_id = req.body.user_id; //TODO: Fix this not working
    const user_password = req.body.user_password;
    // Validate request
    if (!(user_id || user_password)) {
        res.status(400).send({
            message: "Username and password cannot be empty"
        });
        return;
    }
    User.login(user_id, user_password, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while loging in."
            });
        } else{
            res.send(data);
        }
    });
};
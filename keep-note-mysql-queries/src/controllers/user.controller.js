const User = require('../dao/user.dao.js'); 

//Create and save a new product
exports.create = (req, res) => {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const user_mobile = req.body.user_mobile;
    const user_added_date = new Date();
    // Validate request
    if (!(user_name || user_password || user_mobile)) {
        res.status(400).send({
            message: "user_name, user_password, and user_mobile are required"
        });
        return;
    }

    //Create a User
    const user = new User({
        user_name: user_name,
        user_added_date: user_added_date,
        user_password: user_password,
        user_mobile: user_mobile
    });

    //Save User in the database
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        } else{
            res.send(data);
        }
    });
};

// Retrieve all products from the database (with condition).
exports.findAll = (req, res) => {
    console.log("findAll called");
    User.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        } else{
            res.send(data);
        }
    });
};


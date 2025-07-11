const User = require('../dao/user.dao.js'); 
const { responseDto } = require('../dto/response');

//Create and save a new user
exports.create = (req, res) => {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const user_mobile = req.body.user_mobile;
    const user_added_date = new Date();
    // Validate request
    if (!(user_name || user_password || user_mobile)) {
        responseDto(res, 400, "99", "user_name, user_password, and user_mobile are required");
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
            responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving users.");
            return;
        } else{
            responseDto(res, 200, "00", "Successful", data);
        }
    });
};

// Retrieve all users
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if(err){
            responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving users.");
            return;
        } else{
            responseDto(res, 200, "00", "Successful", data);
        }
    });
};


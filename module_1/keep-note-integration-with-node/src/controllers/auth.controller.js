const User = require('../dao/user.dao.js'); 
const authService = require('../services/auth.service.js');
const { responseDto } = require('../dto/response');

exports.login = (req, res) => {
    const user_id = req.body.user_id; //TODO: Fix this not working
    const user_password = req.body.user_password;
    // Validate request
    if (!(user_id || user_password)) {
        responseDto(res, 400, "99", "user_id and user_password are required");
        return;
    }
    User.login(user_id, user_password, (err, data) => {
        if(err){
            responseDto(res, 403, "99", err.responseMsg || "Some error occurred while loging in.");
            return;
        } else{
            responseDto(res, 200, "00", "Login successful", { token:authService.createToken(data)});
        }
    });
};
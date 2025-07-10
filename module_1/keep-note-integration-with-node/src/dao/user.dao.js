
const sql = require('./db');
const User = function(user) {
    this.user_name = user.user_name;
    this.user_added_date = user.user_added_date;
    this.user_password = user.user_password;
    this.user_mobile = user.user_mobile;
};

User.create = (newuser, result) => {
    sql.query("INSERT INTO User SET ?", newuser, (err, res) => {
        if (err) {
            console.error("Error creating User:", err);
            result( {message: err}, null);
            return;
        }
        result(null, { id: res.insertId, username: newuser.user_name });
    });
};

User.getAll = (result) => {
    let query = "SELECT * FROM User";
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving Users:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.login = (id, password, result) => {
    let query = "SELECT *  FROM User WHERE user_id = ? AND user_password = ?";
    sql.query(query, [id, password], (err, res) => {
        if (err) {
            console.log(`Error logging in: ${res}`);
            result( {message: err}, null);
            return;
        }
        if (res.length === 0) {
            console.log(`Login failed for user_id: ${id}`);
            result({ kind: "not_found",message: "Invalid credentials" }, null);
            return;
        }
        result(null, `Login successful`);
    });
};

module.exports = User;
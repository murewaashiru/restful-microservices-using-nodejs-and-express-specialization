const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'practise',
  user: 'root',
  password: 'Password1!'
});

connection.connect(function(err){
    if(err){
        console.error('Error connecting to the database:', err);
    } else{
        console.log('Connected to the database');
    }
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log("Table created");
        }
    });
    
});
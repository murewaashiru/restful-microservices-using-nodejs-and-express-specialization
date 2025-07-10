const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig.js');
var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(function(err){
    if(err){
        console.error('Error connecting to the database:', err);
    } else{
        console.log('Connected to the database');
    }
});

module.exports = connection;
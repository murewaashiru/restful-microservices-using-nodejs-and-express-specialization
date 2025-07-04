const config = require('./config.js');
module.exports = {
    HOST: config.DATABASE_HOST,
    USER: config.DATABASE_USER,
    PASSWORD: config.DATABASE_PASSWORD,
    DB: config.DATABASE_NAME
}
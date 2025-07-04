const express = require('express');
const app = express();
const dateFormat = require('date-format')
const morgan = require('morgan')
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

morgan.token('time',()=> dateFormat.asString(dateFormat.ISO8601_FORMAT,new Date()))

app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

//Register routes
const indexRoutes = require('./src/routes/index.routes.js');
app.use('/', indexRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});

// Export the app for testing purposes
module.exports = app;
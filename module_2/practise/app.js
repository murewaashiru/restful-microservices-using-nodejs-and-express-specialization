const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const dateFormat = require('date-format');
const morgan = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(config.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
morgan.token('time',()=> dateFormat.asString(dateFormat.ISO8601_FORMAT,new Date()))

app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
// const projectRoutes = require('./project');
// app.use('/api/v1/projects', projectRoutes);

app.listen(config.PORT, ()=>{
    console.log(`Server is running on port ${config.PORT}.`);
});

// Export the app for testing purposes
module.exports = app;
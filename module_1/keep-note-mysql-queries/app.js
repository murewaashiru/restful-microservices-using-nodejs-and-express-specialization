const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});

// Export the app for testing purposes
module.exports = app;
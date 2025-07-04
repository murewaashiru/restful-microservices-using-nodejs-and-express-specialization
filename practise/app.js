const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
    res.json({message:"Welcome to Node.js with MySQL integration application"})
})

require('./app/routes/product.routes.js')(app);


const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});

// Export the app for testing purposes
module.exports = app;
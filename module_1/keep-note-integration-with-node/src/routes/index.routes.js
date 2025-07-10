const express = require('express');
const router = express.Router();

router.get("", (req, res)=>{
    res.json({message:"Welcome to Node.js with MySQL integration application"})
})

module.exports = router;

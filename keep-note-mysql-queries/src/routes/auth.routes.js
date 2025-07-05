const express = require('express');
const router = express.Router();
const User = require('../controllers/auth.controller.js');

router.post("/login", User.login);

module.exports = router;

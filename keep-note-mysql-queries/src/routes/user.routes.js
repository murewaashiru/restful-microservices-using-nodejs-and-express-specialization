const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controller.js');

router.get("", User.findAll);
router.post("", User.create);

module.exports = router;

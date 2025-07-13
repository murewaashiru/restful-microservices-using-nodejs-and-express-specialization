const express = require('express');
const router = express.Router();
const Reminder = require('../controllers/reminder.controller.js');

router.post("", Reminder.create);
router.get("", Reminder.findAll);
router.get("/:id", Reminder.findById);
router.put("/:id", Reminder.updateById);
router.delete("/:id", Reminder.deleteById);
router.delete("", Reminder.deleteAll);

module.exports = router;

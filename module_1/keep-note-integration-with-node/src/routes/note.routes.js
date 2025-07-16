const express = require('express');
const router = express.Router();
const Note = require('../controllers/note.controller');

router.post("", Note.create);
router.get("", Note.findAll);
router.get("/:id", Note.findById);
router.put("/:id", Note.updateById);
router.delete("/:id", Note.deleteById);
router.delete("", Note.deleteAll);

module.exports = router;

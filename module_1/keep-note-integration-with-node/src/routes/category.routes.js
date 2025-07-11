const express = require('express');
const router = express.Router();
const Category = require('../controllers/category.controller');

router.post("", Category.create);
router.get("", Category.findAll);
router.get("/:id", Category.findById);
router.put("/:id", Category.updateById);
router.delete("/:id", Category.deleteById);
router.delete("", Category.deleteAll);

module.exports = router;

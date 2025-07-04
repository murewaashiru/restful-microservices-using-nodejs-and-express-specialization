

module.exports = app => {
    const product = require('../controllers/product.controller.js');
    // var router = require('express').Router();

    app.post("/product", product.create);
    app.get("/product", product.findAll);
    app.get("/product/price", product.findAllCostlyProducts);
    app.get("/product/:id", product.findOne);
    app.put("/product/:id", product.update);
    app.delete("/product/:id", product.delete);
    app.delete("/product", product.deleteAll);
}
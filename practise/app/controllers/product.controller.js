// const express = require('express');
const Product = require('../dao/product.dao.js');

//Create and save a new product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Product name can not be empty"
        });
        return;
    }

    //Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    //Save Product in the database
    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        } else{
            res.send(data);
        }
    });
};

// Retrieve all products from the database (with condition).
exports.findAll = (req, res) => {
    console.log("findAll called");
    const name = req.query.name;
    Product.getAll(name, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        } else{
            res.send(data);
        }
    });
};

//Find a single product by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Product with id ${id}.`
                });
            } else{
                res.status(500).send({
                    message: "Error retrieving Product with id " + id
                });
            }
        } else{
            res.send(data);
        }
    });
};

// Find all costly products
exports.findAllCostlyProducts = (req, res) => {
    const price = req.query.price;
    
    Product.getAllCostlyProducts(price, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving costly products."
            });
        } else{
            res.send(data);
        }
    });
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Product content can not be empty"
        });
        return;
    }
    console.log(req.body);

    Product.updateById(req.params.id, new Product(req.body), (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Product with id ${id}.`
                });
            } else{
                res.status(500).send({
                    message: "Error retrieving Product with id " + id
                });
            }
        } else{
            res.send(data);
        }
    });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Product with id ${id}.`
                });
            } else{
                res.send({
                    message: "Could not delete Product with id " + id
                });
            }
        } else{
            res.send({ message: `Product was deleted successfully!` });
        }
    });
};

exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Products"
            });
        }
        else{
            res.send({ message: `All Products were deleted successfully!` });
        }
    })
};
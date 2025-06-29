const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

//This method will get all the Product form the product.json 
router.get("/", (req, res) => {
  try {
    productsController.getProducts((err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({STATUS:"OK",data:results});
    });
    //Handle the exception return response as 400 with status as some error msg
  } catch (err) {
   res.status(400).send({STATUS: 'Try again after some time'});
  }
});

//This method will get the product with given productId form the product.json 
router.get("/:productId", (req, res) => {
  try {
    const productId = req.params.productId;
    productsController.getProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({STATUS:"OK",data:results});
    });

  } catch (err) {
     //Handle the exception return response as 400 with status as some error msg
   res.status(400).send({STATUS: 'Try again after some time'});
  }
});

//This method will save/post a new product in the product.json 
router.post("/", (req, res) => {
  try {
    const productDetails = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity
    }
    productsController.saveProductDetails(productDetails, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(201).send({STATUS: "OK", data: results});
    });

  } catch (err) {
      //Handle the exception return response as 400 with status as some error msg
   res.status(400).send({STATUS: 'Try again after some time'});
  }
});

//This method will delete product with specific productid from the product.json 
router.delete("/:productId", (req, res) => {
  try{
    const productId = req.params.productId;
    productsController.deleteProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({STATUS: "OK", data: results});
    });
  } catch (err) {
     //Handle the exception return response as 400 with status as some error msg
    res.status(400).send({STATUS: 'Try again after some time'});
  }
});

module.exports = router;

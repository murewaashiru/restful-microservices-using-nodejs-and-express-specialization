const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

//The getProducts function take done as callback
const getProducts = function(done){
  fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return done(`Encountered error while reading file: ${err.message}`);
      }
      let productdata = JSON.parse(fileContent);
      return done(undefined, productdata);
  });    
}


//The function getProductById will take two parameters first the id and second the callback
const getProductById = function(id,done){
  fs.readFile(filePath, (err, fileContent)=>{
    if (err) {
      return done(`Encountered error while reading file: ${err.message}`);
    }
    let products = JSON.parse(fileContent);
    const productDetails = products.find(product => product.id == id);
    if (productDetails === undefined || productDetails.length === 0) {
      return done(`Product with id ${id} not found`);
    }
    return done(undefined, productDetails);
  });    
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return done(`Encountered error while reading file: ${err.message}`);
    }
    let productdata = JSON.parse(fileContent);
    // Assign a new id (incremental based on max id in file)
    let newId = 1;
    if (productdata.length > 0) {
      newId = Math.max(...productdata.map(p => Number(p.id) || 0)) + 1;
    }
    const newProduct = { id: newId.toString(), ...ProductDetails };
    productdata.push(newProduct);
    fs.writeFile(filePath, JSON.stringify(productdata, null, 2), (err) => {
      if (err) {
        return done(`Encountered error while writing file: ${err.message}`);
      }
      return done(undefined, newProduct);
    });
  });
}

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file
const deleteProductById = function(productId, done){
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return done(`Encountered error while reading file: ${err.message}`);
    }
    let productdata = JSON.parse(fileContent);
    const index = productdata.findIndex(product => product.id == productId);
    if (index === -1) {
      return done(`Product with id ${productId} not found`);
    }
    const deletedProduct = productdata.splice(index, 1)[0];
    fs.writeFile(filePath, JSON.stringify(productdata, null, 2), (err) => {
      if (err) {
        return done(`Encountered error while writing file: ${err.message}`);
      }
      return done(undefined, deletedProduct);
    });
  });
}


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}
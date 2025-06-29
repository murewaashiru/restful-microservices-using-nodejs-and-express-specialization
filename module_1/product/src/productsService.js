// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  const product = productsList.find(p => p.id === productId);

  if (product) {
    return done(null, JSON.stringify(product));
  } else {
    return done("Requested product doesn't exist..!", null);
  }
}

const saveProduct = (newProduct, done) => {
  const existingProduct = productsList.find(p => p.id === newProduct.id);

  if (existingProduct) {
    return done("Product already exists..!", null);
  }

  productsList.push(newProduct);
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  const index = productsList.findIndex(p => p.id === productId);

  if (index === -1) {
    return done("Requested product doesn't exist..!", null);
  }

  // Merge updateData into the existing product
  productsList[index] = { ...productsList[index], ...updateData };

  return done(null, JSON.stringify(productsList));
}

const deleteProduct = (productId, done) => {
  const index = productsList.findIndex(p => p.id === productId);

  if (index === -1) {
    return done("Requested product doesn't exist..!", null);
  }

  productsList.splice(index, 1);
  return done(null, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}
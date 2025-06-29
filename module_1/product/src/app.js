//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 3000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set default headers
  res.setHeader('Content-Type', 'application/json');
  // Get all products
  if (path === '/products' && method === 'GET') {
    const data = productsService.getProducts();
    res.writeHead(200);
    res.end(data);
  }

  // Get a product with specified id
  else if (path.match(/^\/products\/([0-9]+)$/) && method === 'GET') {
    const id = parseInt(path.split('/')[2]);
    productsService.getProductsById(id, (err, result) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: err }));
      } else {
        res.writeHead(200);
        res.end(result);
      }
    });
  }

  // Create a new product
  else if (path === '/products' && method === 'POST') {
    const data = await getRequestData(req);
    const newProduct = JSON.parse(data);
    productsService.saveProduct(newProduct, (err, result) => {
      if (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err }));
      } else {
        res.writeHead(201);
        res.end(result);
      }
    });
  }

  // Update a specific product
  else if (path.match(/^\/products\/([0-9]+)$/) && method === 'PUT') {
    const id = parseInt(path.split('/')[2]);
    const data = await getRequestData(req);
    const updateData = JSON.parse(data);
    productsService.updateProduct(id, updateData, (err, result) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: err }));
      } else {
        res.writeHead(200);
        res.end(result);
      }
    });
  }

  else if (path.match(/^\/products\/([0-9]+)$/) && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    productsService.deleteProduct(id, (err, result) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: err }));
      } else {
        res.writeHead(200);
        res.end(result);
      }
    });
  }

  // 404 Not Found
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})
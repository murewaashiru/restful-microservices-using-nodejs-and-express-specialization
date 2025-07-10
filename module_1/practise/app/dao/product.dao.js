const sql = require('./db.js');
const Product = function(product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
};
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            console.error("Error creating product:", err);
            result(err, null);
            return;
        }
        console.log("Created product:", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            console.error("Error retrieving product:", err);
            result(err, null);
            return;
        }

        if( res.length) {
            console.log("Found product:", res[0]);
            result(null, res[0]);
            return;
        }
        //not found
        result({ kind: "not_found" }, null);
    });
};

// Product.getAll = (result) => {
//     let query = "SELECT * FROM products";
//     sql.query(query, (err, res) => {
//         if (err) {
//             console.error("Error retrieving products:", err);
//             result(err, null);
//             return;
//         }
//         console.log("Products:", res);
//         result(null, res);
//     });
// };

Product.getAll = (name, result) => {
    let query = "SELECT * FROM products";
    console.log(`Name: ${name}`);
    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving products:", err);
            result(err, null);
            return;
        }
        console.log("Products:", res);
        result(null, res);
    });
};

Product.getAllCostlyProducts = (price, result) => {
    let query = "SELECT * FROM products";
    console.log(`Price: ${price}`);
    if (price) {
        query += ` WHERE price LIKE '%${price}%'`;
    }
    sql.query(query, (err, res) => {
        if(err){
            console.error("Error retrieving products:", err);
            result(err, null);
            return;
        }
        console.log("Products:", res);
        result(null, res);
    })
};

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
        [product.name, product.description, product.price, id],
        (err, res) => {
            if (err) {
                console.log(`Error: ${err}`)
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated product:", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
}

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
        if (err) {
            console.error("Error deleting product:", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted product with id:", id);
        result(null, res);
    });
};

Product.removeAll = (result) => {
    sql.query("DELETE FROM products", (err, res) => {
        if (err) {
            console.error("Error deleting all products:", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.affectedRows} products`);
        result(null, res);
    });
};

module.exports = Product;
const sql = require('./db');
const Category = function(category) {
    this.category_name = category.category_name;
    this.category_descr = category.category_descr;
    this.category_creation_date = category.category_creation_date;
    this.category_creator = category.category_creator;
};

Category.create = (newRecord, result) => {
    sql.query("INSERT INTO Category SET ?", newRecord, (err, res) => {
        if (err) {
            console.error("Error creating category:", err);
            result( {responseMsg: err}, null);
            return;
        }
        result(null, { category_id: res.insertId, ...newRecord });
    });
};

Category.getAll = (category_creation_date, result) => {
    let query = "SELECT * FROM Category";
    if(category_creation_date){
        query = `${query} WHERE category_creation_date > '${category_creation_date}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving categories:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Category.getById = (category_id, result) => {
    let query = `SELECT * FROM Category WHERE category_id = ${category_id}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving category:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Category.getAllByCreator = (category_creator, result) => {
    let query = `SELECT * FROM Category WHERE category_creator = ${category_creator}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving categories:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Category.updateById = (id, category, result) => {
    sql.query(
        "UPDATE Category SET category_name = ?, category_descr = ? WHERE category_id = ?",
        [category.category_name, category.category_descr, id],
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

            console.log("Updated category:", { category_id: id, ...category });
            result(null, { category_id: id, ...category });
        }
    );
}

Category.deleteById = (category_id, result) => {
    let query = `DELETE FROM Category WHERE category_id = ${category_id}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error deleting category:", err);
            result(null, {responseMsg: err});
            return;
        }
        if (res.affectedRows == 0) {
            console.log("No category found with id:", category_id);
            result({ kind: "not_found", responseMsg:"Category already deleted" }, null);
            return;
        }
        console.log("Deleted category with id:", category_id);
        result(null, res);
    });
};

Category.deleteAll = (result) => {
    sql.query("DELETE FROM Category", (err, res) => {
        if (err) {
            console.error("Error deleting all categories:", err);
            result(null, {responseMsg: err});
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Category;
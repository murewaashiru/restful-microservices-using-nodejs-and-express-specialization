const Category = require('../dao/category.dao'); 
const categoryService = require('../services/category.service.js');
const { responseDto } = require('../dto/response');

//Create and save a new category
const create = (req, res) => {
    const category_name = req.body.category_name;
    const category_descr = req.body.category_description;
    const category_creator = req.claims.user_name;

    // Validate request
    if (!(category_name || category_description)) {
        responseDto(res, 400, "99", "category_name and category_description are required");
        return;
    }

    //Create a category
    const category = new Category({
        category_name,
        category_descr,
        category_creation_date: new Date(),
        category_creator
    });

    categoryService.create(category, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while creating category.", null);
        return;
    };

    responseDto(res, 200, "00", "Successful", result);
  });
};

// Retrieve all categories from the database (with condition).
const findAll = (req, res) => {
    categoryService.getAll(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving categories.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No category found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const findById = (req, res) => {
    categoryService.getById(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving category.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No category found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const updateById = (req, res) => {
    const category_name = req.body.category_name;
    const category_descr = req.body.category_description;

    // Validate request
    if (!(category_name || category_description)) {
        responseDto(res, 400, "99", "category_name OR category_description are required");
        return;
    }

    const category = {
        category_name,
        category_descr
    };

    // Update category in the database
    categoryService.updateById(req.params.id, category, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while updating category.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No category found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const deleteById = (req, res) => {
    categoryService.deleteById(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No category found");
            return;
        }
        
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting a category.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No category found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

const deleteAll = (req, res) => {
    categoryService.deleteAll(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No category found");
            return;
        }
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting all categories.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No category found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

module.exports = {findAll, create, findById, updateById, deleteById, deleteAll};
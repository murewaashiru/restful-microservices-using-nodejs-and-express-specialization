const categoryDAO = require('../dao/category.dao.js');

const create = function(req, done) {
    categoryDAO.create(req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const getAll = function(req, done){
    categoryDAO.getAll(req.query.category_creation_date, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const getById = function(req, done){
    categoryDAO.getById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const updateById = function(id, req, done) {
    categoryDAO.updateById(id, req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const deleteById = function(req, done){
    categoryDAO.deleteById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const deleteAll = function(req, done){
    categoryDAO.deleteAll((err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

module.exports = {create, getAll, getById, updateById, deleteById, deleteAll}
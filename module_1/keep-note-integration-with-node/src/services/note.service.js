const noteDAO = require('../dao/note.dao');

const create = function(req, user_id, category_id, reminder_id, done) {
    noteDAO.create(req, user_id, category_id, reminder_id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const getAll = function(req, done){
    noteDAO.getAll(req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const getById = function(req, done){
    noteDAO.getById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const updateById = function(id, req, done) {
    noteDAO.updateById(id, req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const deleteById = function(req, done){
    noteDAO.deleteById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const deleteAll = function(req, done){
    noteDAO.deleteAll((err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

module.exports = {create, getAll, getById, updateById, deleteById, deleteAll}
const reminderDAO = require('../dao/reminder.dao');

const create = function(req, done) {
    reminderDAO.create(req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const getAll = function(req, done){
    reminderDAO.getAll(req.query.reminder_creation_date, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const getById = function(req, done){
    reminderDAO.getById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const updateById = function(id, req, done) {
    reminderDAO.updateById(id, req, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
};

const deleteById = function(req, done){
    reminderDAO.deleteById(req.params.id, (err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

const deleteAll = function(req, done){
    reminderDAO.deleteAll((err, data) => {
        if(err){
            done(err, null);
        } else{
            done(null, data);
        }
    });
}

module.exports = {create, getAll, getById, updateById, deleteById, deleteAll}
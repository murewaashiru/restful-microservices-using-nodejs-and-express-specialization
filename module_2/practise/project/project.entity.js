const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    premiseType: { type:String, required:true, unique:true},
    size: { type:String, required:true, default:""},
    budget: { type:String, required:true, default:""},
    ownership: { type:String, required:true, default:""},
    rooms: { type:Number, required:true, default:1}
}, {
    collection:'projects'
});

const ProjectModel = mongoose.model('projects', schema);
module.exports = ProjectModel;
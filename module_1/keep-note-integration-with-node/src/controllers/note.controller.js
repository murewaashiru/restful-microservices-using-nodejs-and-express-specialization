const Note = require('../dao/note.dao'); 
const noteService = require('../services/note.service.js');
const { responseDto } = require('../dto/response');

//Create and save a new note
const create = (req, res) => {
    const note_title = req.body.note_title;
    const note_status = req.body.note_status || "active"; // Default to 'active' if not provided
    const note_content = req.body.note_content;
    const category_id = req.body.category_id;
    const reminder_id = req.body.reminder_id;

    // Validate request
    if (!(note_title || note_content)) {
        responseDto(res, 400, "99", "note_title, OR note_content are required");
        return;
    }

    //Create a note
    const note = new Note({
        note_title,
        note_status,
        note_content,
        note_creation_date: new Date()
    });

    noteService.create(note, req.claims.user_id, category_id, reminder_id, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while creating note.", null);
        return;
    };
    console.log("Note created successfully:", result);
    responseDto(res, 200, "00", "Successful", result);
  });
};

// Retrieve all notes from the database (with condition).
const findAll = (req, res) => {
    noteService.getAll(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving notes.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No note found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const findById = (req, res) => {
    noteService.getById(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving note.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No note found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const updateById = (req, res) => {
    const note_title = req.body.note_title;
    const note_status = req.body.note_status || "active"; // Default to 'active' if not provided
    const note_content = req.body.note_content;

    // Validate request
    if (!(note_title || note_content)) {
        responseDto(res, 400, "99", "note_title, OR note_content are required");
        return;
    }

    const note = {
        note_title,
        note_status,
        note_content
    };

    // Update note in the database
    noteService.updateById(req.params.id, note, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while updating note.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No note found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const deleteById = (req, res) => {
    noteService.deleteById(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No note found");
            return;
        }
        
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting a note.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No note found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

const deleteAll = (req, res) => {
    noteService.deleteAll(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No note found");
            return;
        }
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting all notes.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No note found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

module.exports = {findAll, create, findById, updateById, deleteById, deleteAll};
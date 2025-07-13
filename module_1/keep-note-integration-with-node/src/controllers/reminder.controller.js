const Reminder = require('../dao/reminder.dao.js'); 
const reminderService = require('../services/reminder.service.js');
const { responseDto } = require('../dto/response');

const create = (req, res) => {
    const reminder_name = req.body.reminder_name;
    const reminder_descr = req.body.reminder_description;
    const reminder_type = req.body.reminder_type || "default"; // Default type if not provided
    const reminder_creator = req.claims.user_name;

    // Validate request
    if (!(reminder_name || reminder_descr)) {
        responseDto(res, 400, "99", "reminder_name and reminder_description are required");
        return;
    }

    const reminder = new Reminder({
        reminder_name,
        reminder_descr,
        reminder_type,
        reminder_creation_date: new Date(),
        reminder_creator
    });

    reminderService.create(reminder, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while creating reminder.", null);
        return;
    };

    responseDto(res, 200, "00", "Successful", result);
  });
};

// Retrieve all reminders from the database (with condition).
const findAll = (req, res) => {
    reminderService.getAll(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving reminders.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No reminder found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const findById = (req, res) => {
    reminderService.getById(req, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while retrieving reminder.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No reminder found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const updateById = (req, res) => {
    const reminder_name = req.body.reminder_name;
    const reminder_descr = req.body.reminder_description;

    // Validate request
    if (!(reminder_name || reminder_descr)) {
        responseDto(res, 400, "99", "reminder_name OR reminder_description are required");
        return;
    }

    const reminder = {
        reminder_name,
        reminder_descr,
        reminder_type: req.body.reminder_type || "default" // Default type if not provided
    };

    // Update reminder in the database
    reminderService.updateById(req.params.id, reminder, (err, result) => {
    if (err) {
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while updating reminder.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No reminder found");
        return;
    }
    responseDto(res, 200, "00", "Successful", result);
  });
};

const deleteById = (req, res) => {
    reminderService.deleteById(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No reminder found");
            return;
        }
        
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting a reminder.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No reminder found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

const deleteAll = (req, res) => {
    reminderService.deleteAll(req, (err, result) => {
    if (err) {
        if(err.kind === "not_found") {
            responseDto(res, 404, "99", err.responseMsg ||"No reminder found");
            return;
        }
        responseDto(res, 500, "99", err.responseMsg || "Some error occurred while deleting all reminders.");
        return;
    };
    if (result.length === 0) {
        responseDto(res, 404, "99", "No reminder found");
        return;
    }
    responseDto(res, 200, "00", "Successful");
  });
};

module.exports = {findAll, create, findById, updateById, deleteById, deleteAll};
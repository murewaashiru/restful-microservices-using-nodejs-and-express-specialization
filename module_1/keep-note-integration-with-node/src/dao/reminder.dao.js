const sql = require('./db');
const Reminder = function(reminder) {
    this.reminder_name = reminder.reminder_name;
    this.reminder_descr = reminder.reminder_descr;
    this.reminder_type = reminder.reminder_type;
    this.reminder_creation_date = reminder.reminder_creation_date;
    this.reminder_creator = reminder.reminder_creator;
};

Reminder.create = (newRecord, result) => {
    sql.query("INSERT INTO Reminder SET ?", newRecord, (err, res) => {
        if (err) {
            console.error("Error creating reminder:", err);
            result( {responseMsg: err}, null);
            return;
        }
        result(null, { reminder_id: res.insertId, ...newRecord });
    });
};

Reminder.getAll = (reminder_creation_date, result) => {
    let query = "SELECT * FROM Reminder";
    if(reminder_creation_date){
        query = `${query} WHERE reminder_creation_date > '${reminder_creation_date}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving reminders:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Reminder.getById = (reminder_id, result) => {
    let query = `SELECT * FROM Reminder WHERE reminder_id = ${reminder_id}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving reminder:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Reminder.getAllByCreator = (reminder_creator, result) => {
    let query = `SELECT * FROM Reminder WHERE reminder_creator = ${reminder_creator}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving reminders:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Reminder.updateById = (id, reminder, result) => {
    sql.query(
        "UPDATE Reminder SET reminder_name = ?, reminder_descr = ?, reminder_type = ? WHERE reminder_id = ?",
        [reminder.reminder_name, reminder.reminder_descr, reminder.reminder_type, id],
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

            console.log("Updated reminder:", { reminder_id: id, ...reminder });
            result(null, { reminder_id: id, ...reminder });
        }
    );
}

Reminder.deleteById = (reminder_id, result) => {
    let query = `DELETE FROM Reminder WHERE reminder_id = ${reminder_id}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error deleting reminder:", err);
            result(null, {responseMsg: err});
            return;
        }
        if (res.affectedRows == 0) {
            console.log("No reminder found with id:", reminder_id);
            result({ kind: "not_found", responseMsg:"Reminder not found" }, null);
            return;
        }
        console.log("Deleted reminder with id:", reminder_id);
        result(null, res);
    });
};

Reminder.deleteAll = (result) => {
    sql.query("DELETE FROM Reminder", (err, res) => {
        if (err) {
            console.error("Error deleting all reminders:", err);
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

module.exports = Reminder;
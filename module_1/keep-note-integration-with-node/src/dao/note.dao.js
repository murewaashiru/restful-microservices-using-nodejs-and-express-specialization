const sql = require('./db');
const Note = function(note) {
    this.note_title = note.note_title;
    this.note_status = note.note_status;
    this.note_content = note.note_content;
    this.note_creation_date = note.note_creation_date;
};

Note.create = (newNote, user_id, category_id, reminder_id, result) => {
    sql.query("INSERT INTO Note SET ?", newNote, (err, noteRes) => {
        if (err) {
            console.error("Error creating note:", err);
            result({ responseMsg: err }, null);
            return;
        }

        const note_id = noteRes.insertId;

        // Link note to user
        sql.query("INSERT INTO UserNote (user_id, note_id) VALUES (?, ?)", [user_id, note_id], (errUserNote) => {
            if (errUserNote) {
                console.error("Error linking note to user:", errUserNote);
                result({ responseMsg: errUserNote }, null);
                return;
            }
            // Link note to category if provided
            if (category_id) {
                sql.query("INSERT INTO NoteCategory (note_id, category_id) VALUES (?, ?)", [note_id, category_id], (errCategory) => {
                    if (errCategory) {
                        console.error("Error linking note to category:", errCategory);
                        result({ responseMsg: errCategory }, null);
                        return;
                    }

                    // Link note to reminder if provided
                    if (reminder_id) {
                        sql.query("INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, ?)", [note_id, reminder_id], (errReminder) => {
                            if (errReminder) {
                                console.error("Error linking note to reminder:", errReminder);
                                result({ responseMsg: errReminder }, null);
                                return;
                            }
                            result(null, { note_id, ...newNote });
                        });
                    } else {
                        result(null, { note_id, ...newNote });
                    }
                });
            } 
            else if (reminder_id) {
                sql.query("INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, ?)", [note_id, reminder_id], (errReminder) => {
                    if (errReminder) {
                        console.error("Error linking note to reminder:", errReminder);
                        result({ responseMsg: errReminder }, null);
                        return;
                    }
                    result(null, { note_id, ...newNote });
                });
            } 
            else {
                result(null, { note_id, ...newNote });
            }
        });
    });
};

Note.getAll = (req, result) => {
    let query = "SELECT * FROM Note ORDER BY note_id DESC";
    let note_creation_date = req.query.note_creation_date;
    let category_id = req.query.category_id;
    if(note_creation_date){
        query = `SELECT * FROM Note WHERE note_creation_date > '${note_creation_date}' ORDER BY note_id DESC`;
    }
    if(category_id){
        query = `SELECT n.* FROM Note n JOIN NoteCategory nc ON n.note_id = nc.note_id WHERE nc.category_id = ${category_id} ORDER BY n.note_id DESC`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving notes:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Note.getById = (note_id, result) => {
    let query = `SELECT * FROM Note WHERE note_id = ${note_id}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving note:", err);
            result({responseMsg: err}, null);
            return;
        }
        result(null, res);
    });
};

Note.getAllByCreator = (note_creator, result) => {
    let query = `SELECT * FROM Note WHERE note_creator = ${note_creator}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error retrieving notes:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Note.updateById = (id, note, result) => {
    sql.query(
        "UPDATE Note SET note_title = ?, note_content = ?, note_status = ? WHERE note_id = ?",
        [note.note_title, note.note_content, note.note_status, id],
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

            console.log("Updated note:", { note_id: id, ...note });
            result(null, { note_id: id, ...note });
        }
    );
}

Note.deleteById = (note_id, result) => {
    let query = `DELETE FROM Note WHERE note_id = ${note_id}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error deleting note:", err);
            result(null, {responseMsg: err});
            return;
        }
        if (res.affectedRows == 0) {
            console.log("No note found with id:", note_id);
            result({ kind: "not_found", responseMsg:"Note already deleted" }, null);
            return;
        }
        console.log("Deleted note with id:", note_id);
        result(null, res);
    });
};

Note.deleteAll = (result) => {
    sql.query("DELETE FROM Note", (err, res) => {
        if (err) {
            console.error("Error deleting all notes:", err);
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

module.exports = Note;
-- create a schema called `notesdb`
CREATE SCHEMA notesdb;

-- Use the schema
USE notesdb;

-- Create the tables for Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory

-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
  CREATE TABLE Note (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    note_title VARCHAR(255),
    note_content TEXT,
    note_status VARCHAR(50),
    note_creation_date DATETIME
);

-- User table fields: user_id, user_name, user_added_date, user_password, user_mobile
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) UNIQUE,
    user_added_date DATETIME,
    user_password VARCHAR(255),
    user_mobile VARCHAR(20) UNIQUE
);
-- alter table User modify column user_added_date date
ALTER TABLE User MODIFY COLUMN user_added_date DATE;

-- Category table fields : category_id, category_name, category_descr, category_creation_date, category_creator
CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE,
    category_descr TEXT,
    category_creation_date DATETIME,
    category_creator VARCHAR(100)
);

-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator
CREATE TABLE Reminder (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    reminder_name VARCHAR(100) UNIQUE,
    reminder_descr TEXT,
    reminder_type VARCHAR(50),
    reminder_creation_date DATETIME,
    reminder_creator VARCHAR(100)
);

-- NoteCategory table fields : notecategory_id, note_id, category_id
CREATE TABLE NoteCategory (
    notecategory_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT,
    category_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- NoteReminder table fields : notereminder_id, note_id, reminder_id
CREATE TABLE NoteReminder (
    notereminder_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT,
    reminder_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder(reminder_id)
);

-- Usernote table fields : usernote_id, user_id, note_id
CREATE TABLE UserNote (
    usernote_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    note_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (note_id) REFERENCES Note(note_id)
);


-- Insert the rows into the created tables (Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory)

-- Fetch the row from User table based on Id and Password.
SELECT *  FROM User WHERE user_id = ? AND user_password = ?;

-- Fetch all the rows from Note table based on the field note_creation_date.
SELECT *  FROM Note WHERE note_creation_date = ?;

-- Fetch all the Categories created after the particular Date.
SELECT * FROM Category WHERE category_creation_date > ?;

-- Fetch all the Note ID from UserNote table for a given User.
SELECT note_id FROM UserNote WHERE user_id = ?;

-- Write Update query to modify particular Note for the given note id.
UPDATE Note SET note_title = ?, note_content = ?,  note_status = ?, note_creation_date = ? WHERE note_id = ?;

-- Fetch all the Notes from the Note table by a particular User.
SELECT n.* FROM Note n JOIN UserNote un ON n.note_id = un.note_id WHERE un.user_id = ?;

-- Fetch all the Notes from the Note table for a particular Category.
SELECT n.* FROM Note n JOIN NoteCategory nc ON n.note_id = nc.note_id WHERE nc.category_id = ?;

-- Fetch all the reminder details for a given note id.
SELECT r.* FROM Reminder r JOIN NoteReminder nr ON r.reminder_id = nr.reminder_id WHERE nr.note_id = ?;

-- Fetch the reminder details for a given reminder id.
SELECT * FROM Reminder WHERE reminder_id = ?;

-- Write a query to create a new Note from particular User (Use Note and UserNote tables - insert statement).
-- First, insert into Note
INSERT INTO Note (note_title, note_content, note_status, note_creation_date) VALUES (?, ?, ?, ?);
-- Then, link the Note to the User using LAST_INSERT_ID()
INSERT INTO UserNote (user_id, note_id) VALUES (?, LAST_INSERT_ID());

-- Write a query to create a new Note from particular User to particular Category(Use Note and NoteCategory tables - insert statement)
-- Insert into Note
INSERT INTO Note (note_title, note_content, note_status, note_creation_date) VALUES (?, ?, ?, ?);
-- Link to Category
INSERT INTO NoteCategory (note_id, category_id) VALUES (LAST_INSERT_ID(), ?);


-- Write a query to set a reminder for a particular note (Use Reminder and NoteReminder tables - insert statement)
-- Insert into Reminder
INSERT INTO Reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator) VALUES (?, ?, ?, ?, ?);
-- Link to Note
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, LAST_INSERT_ID());

-- Write a query to delete particular Note added by a User(Note and UserNote tables - delete statement)
-- First, ensure the note belongs to the user
DELETE FROM Note 
WHERE note_id = (
    SELECT n.note_id 
    FROM Note n
    JOIN UserNote un ON n.note_id = un.note_id
    WHERE n.note_id = ? AND un.user_id = ?
)
LIMIT 1;
-- Optionally, delete the relationship from UserNote (if not using ON DELETE CASCADE)
DELETE FROM UserNote WHERE note_id = ? AND user_id = ?;

-- Write a query to delete particular Note from particular Category(Note and NoteCategory tables - delete statement)
DELETE FROM NoteCategory WHERE note_id = ? AND category_id = ?;


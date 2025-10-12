import Database from "better-sqlite3";

const database = new Database("notes.db")

// SQL statements for basic operations
const createNotesDB = database.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT
    )
`);
// create
const insertNote = database.prepare(`
    INSERT INTO notes (title, content)
    VALUES (?, ?) 
`);
// read
const selectNotes = database.prepare(`
    SELECT * FROM notes 
`);
const selectNoteById = database.prepare(`
    SELECT * FROM notes
    WHERE id = ?
`);
// update
const updateNote = database.prepare(`
    UPDATE notes
    SET content = ?
    WHERE id = ?
`);
// remove
const deleteNote = database.prepare(`
    DELETE FROM notes
    WHERE id = ? 
`);

// constructor destructor functions
function initDB() {
    createNotesDB.run();
}
function releaseDB() {
    database.close();
}

// CRUD operation wrapper functions
function createNote(title, content) {
    return insertNote.run(title, content);
}
function listNotes() {
    return selectNotes.all();
}
// searches for a note by id
function findNote(id) {
    return selectNoteById.get(id);
}
function updateNoteContent(id, newContent) {
    return updateNote.run(newContent, id);
}
function removeNote(id) {
    return deleteNote.run(id);
}

// function exports
export {
    initDB, releaseDB,
    createNote,
    listNotes, findNote,
    updateNoteContent,
    removeNote,
};
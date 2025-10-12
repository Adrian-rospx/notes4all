import Database from "better-sqlite3";

const database = new Database('notes.db')

// SQL statements for basic operations
const createNotesDB = database.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT
    )
`);
const insertNote = database.prepare(`
    INSERT INTO notes (title, content)
    VALUES (?, ?) 
`);
const selectNotes = database.prepare(`
    SELECT * FROM notes 
`);
const updateNoteContent = database.prepare(`
    UPDATE notes
    SET content = ?
    WHERE id = ?
`);
const deleteNote = database.prepare(`
    DELETE FROM notes
    WHERE id = ? 
`);

// constructor destructor functions
function initDb() {
    createNotesDB.run();
}
function releaseDB() {
    database.close();
}

// CRUD operation wrapper functions
function createNote(title, content) {
    insertNote.run(title, content);
}
function listNotes() {
    const notes = selectNotes.all();
    for (let note of notes) {
        console.log(note);
    }
}
function updateContent(id, newContent) {
    updateNoteContent.run(newContent, id);
}
function removeNote(id) {
    deleteNote.run(id);
}

// function exports
export {
    initDb, releaseDB,
    createNote,
    listNotes,
    updateContent,
    removeNote
};
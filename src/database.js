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
const updateNoteContent = database.prepare(`
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
// Returns a string representation of all notes
function listNotes() {
    const notes = selectNotes.all();
    
    const string = notes.map((note) =>
        Object.entries(note)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
    ).join("\n\n");
    return string;
}
// searches for a note by id
function findNote(id) {
    const note = selectNoteById.get(id);
    const string = Object.entries(note)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    return string;
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
    listNotes, findNote,
    updateContent,
    removeNote
};
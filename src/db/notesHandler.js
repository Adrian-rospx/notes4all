import database from "./database.js";

// SQL statements for basic operations
// create
const insertNote = database.prepare(`
    INSERT INTO notes (title, content, date_created)
    VALUES (?, ?, datetime('now'))
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

// CRUD operation wrapper functions
export function createNote(title, content) {
    return insertNote.run(title, content);
}
export function getNotes() {
    return selectNotes.all();
}
export function getNote(id) {
    return selectNoteById.get(id);
}
export function modifyNote(id, newContent) {
    return updateNote.run(newContent, id);
}
export function removeNote(id) {
    return deleteNote.run(id);
}
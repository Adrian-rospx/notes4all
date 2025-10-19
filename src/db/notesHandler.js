import database from "./database.js";

// SQL statements for basic operations with notes
// create
const insertNote = database.prepare(`
    INSERT INTO notes (title, content, date_created, user_id)
    VALUES (?, ?, datetime('now'), ?)
`);
// read
const selectNotes = database.prepare(`
    SELECT id, title, content, date_created
    FROM notes
    WHERE user_id = ?
    ORDER BY date_created DESC;
`);
const selectNote = database.prepare(`
    SELECT id, title, content, date_created
    FROM notes
    WHERE id = ? AND user_id = ?
`);
// update
const updateNote = database.prepare(`
    UPDATE notes
    SET content = ?
    WHERE id = ? AND user_id = ?
`);
// remove
const deleteNote = database.prepare(`
    DELETE FROM notes
    WHERE id = ? AND user_id = ?
`);

// CRUD operation wrapper functions
export function createNote(title, content, userId) {
    return insertNote.run(title, content, userId);
}
export function getNotes(userId) {
    return selectNotes.all(userId)
}
export function getNote(noteId, userId) {
    return selectNote.get(noteId, userId);
}
export function modifyNote(noteId, newContent, userId) {
    return updateNote.run(newContent, noteId, userId);
}
export function removeNote(noteId, userId) {
    return deleteNote.run(noteId, userId);
}
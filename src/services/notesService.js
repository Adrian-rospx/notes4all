import * as notesDB from "../db/notesHandler.js"

export function getNotes(userId) {
    const notes = notesDB.getNotes(userId);
        
    if (typeof notes === "undefined")
        throw new Error("Error 404");
    
    const string = notes.map((note) =>
        Object.entries(note)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
    ).join("\n\n");
    return string;
}

export function getNote(noteId, userId) {
    const note = notesDB.getNote(noteId, userId);
    
    if (typeof note === "undefined")
        throw new Error("Error 404");
        
    const string = Object.entries(note)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    return string;
}

export function createNote(title, content, userId) {
    if (!title || !content)
        throw new Error("Error 400");
    
    const result = notesDB.createNote(title, content, userId);
    // return a json representation of the data
    return notesDB.getNote(result.lastInsertRowid, userId);
}

export function modifyNote(noteId, content, userId) {
    if (!content)
        throw new Error("Error 404");

    const result = notesDB.modifyNote(noteId, content, userId);
    if (result.changes === 0)
        throw new Error("Error 404");
}

export function removeNote(noteId, userId) {
    const result = notesDB.removeNote(noteId, userId);

    if (result.changes === 0)
        throw new Error("Error 404");
}
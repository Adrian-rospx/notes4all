import * as notesDB from "../db/notesHandler.js"

export function getNotes() {
    const notes = notesDB.getNotes();
        
    if (typeof notes === "undefined")
        throw new Error("Error 404");
    
    const string = notes.map((note) =>
        Object.entries(note)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
    ).join("\n\n");
    return string;
}

export function getNote(id) {
    const note = notesDB.getNote(id);
    
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
    return notesDB.getNotePublic(result.lastInsertRowid);
}

export function modifyNote(id, content) {
    if (!content)
        throw new Error("Error 404");

    const result = notesDB.modifyNote(id, content);
    if (result.changes === 0)
        throw new Error("Error 404");
}

export function removeNote(id) {
    const result = notesDB.removeNote(id);

    if (result.changes === 0)
        throw new Error("Error 404");
}
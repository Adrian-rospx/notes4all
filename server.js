import Database from "better-sqlite3";

const database = new Database('notes.db')

// crud operations
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
const listNotes = database.prepare(`
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

createNotesDB.run();

insertNote.run("Test note", "The test note has been inserted!");
updateNoteContent.run("This note has been altered", 2);
deleteNote.run(2);
console.log(listNotes.all());

process.on('exit', () => database.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
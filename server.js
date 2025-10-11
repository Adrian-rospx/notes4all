import Database from "better-sqlite3";

const database = new Database('notes.db')

database.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT
    );
`);

const insert = database.prepare(`
   INSERT INTO notes (title, content)
   VALUES (?, ?) 
`);

insert.run("First Note", "The note has been inserted!");
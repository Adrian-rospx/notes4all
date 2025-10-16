import Database from "better-sqlite3";

// Database initialisation
const database = new Database("notes.db");

// schemas
database.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        date_created TEXT
    )
`).run();
database.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        date_created TEXT
    )
`).run();

export default database;
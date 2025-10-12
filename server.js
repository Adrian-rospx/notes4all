import * as DbOps from './src/database.js';

DbOps.initDb();
// DbOps.removeNote(2);
DbOps.listNotes();

// exit cases
process.on('exit', () => {
    DbOps.releaseDB();
});
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
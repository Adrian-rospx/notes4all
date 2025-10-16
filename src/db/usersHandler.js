import database from "./database.js";

// SQL statements for user database interactions
const insertUser = database.prepare(`
    INSERT INTO users (username, password, date_created)
    VALUES (?, ?, datetime('now'))
`);
const selectUserByID = database.prepare(`
    SELECT * FROM users
    WHERE id = ?
`);
const selectUser = database.prepare(`
    SELECT * FROM users
    WHERE username = ?
`); 
const selectUserPublic = database.prepare(`
    SELECT id, username, date_created
    FROM users
    WHERE username = ?
`);
const removeUser = database.prepare(`
    DELETE FROM users
    WHERE id = ?
`);

// wrapper functions
export function createUser(username, password) {
    return insertUser.run(username, password);
}
export function getUserByID(id) {
    return selectUserByID.get(id);
}
export function getUser(username) {
    return selectUser.get(username);
}
export function getUserPublic(username) {
    return selectUserPublic.get(username);
}
export function deleteUser(id) {
    return removeUser.run(id);
}
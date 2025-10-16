import database from "./database";

// SQL statements for user database interactions
const insertUser = database.prepare(`
    INSERT INTO users (username, password, date_created)
    VALUES (?, ?, datetime('now'))
`);
const selectUserByID = database.prepare(`
    SELECT * FROM users
    WHERE id = ?
`);
const selectUserByName = database.prepare(`
    SELECT * FROM users
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
export function getUserByName(username) {
    return selectUserByName.get(username);
}
export function deleteUser(id) {
    return removeUser.run(id);
}
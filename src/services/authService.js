import * as bcrypt from "bcrypt";
import * as usersDB from "../db/usersHandler.js";

const saltRounds = 10;

export function getUser(username) {
    const user = usersDB.getUserPublic(username);

    if (typeof user === "undefined")
        throw new Error("Error 404");

    return user;
}

export function createUser(username, password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
        const result = usersDB.createUser(username, hash);
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE")
            throw new Error("Error 409");
        else
            throw err;
    }
    return usersDB.getUserPublic(username);
}
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersDB from "../db/usersHandler.js";

const saltRounds = 10;

export function registerUser(username, password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
        const result = usersDB.createUser(username, hash);
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE")
            throw new Error("Error 409");
        else
            throw err;
    }
    return usersDB.getUser(username);
}

export function loginUser(username, password) {
    const user = usersDB.getUserPrivate(username);
    
    if (!username || !bcrypt.compareSync(password, user.password))
        throw new Error("Error 401");
    
    const token = jwt.sign(
        {userId: user.id, name: username},
        process.env.JWT_SECRET,
        { expiresIn: "1h"}
    );
    return token;
}
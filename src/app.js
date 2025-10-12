import express from "express";
import * as DbOps from "./database.js";

const application = express();
const PORT = 3000;

DbOps.initDb();
application.use(express.json());

// get requests
application.get("/", (req, res) => {
    const string = DbOps.listNotes();
    res.status(200).send(string);
});
application.get("/:id", (req, res) => {
    const id = req.params.id;
    const string = DbOps.findNote(id);
    res.status(200).send(string);
});

// post request
application.post("/", (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;

    if (!title || !content)
        return res.status(400).send("Title and content are required!");

    const result = DbOps.createNote(title, content);
    const lastID = DbOps.LastNoteID(title);
    res.status(201).json({id: lastID, title, content});
});

// delete request ...

export default application;

// exit process
process.on("exit", () => {
    DbOps.releaseDB();
    console.log("Process closed.");
});
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
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
    const { title, content } = req.body;

    if (!title || !content)
        return res.status(400).send("Bad request. Title and content are required!");

    const result = DbOps.createNote(title, content);
    res.status(201).json({id: result.lastInsertRowid, title, content});
});

application.patch("/:id", (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    if (!content)
        return res.status(400).send("Bad request. Content is required!");

    const result = DbOps.updateNoteContent(id, content);
    if (result.changes === 0)
        return res.status(404).send("Note not found.")

    res.status(200).send("Resource updated successfully");
});

// delete request 
application.delete("/:id", (req, res) => {
    const id = req.params.id;
    const result = DbOps.removeNote(id);
    
    if (result.changes === 0)
        return res.status(404).send("Note not found");

    res.status(200).send("Resource deleted");
});

export default application;

// exit process
process.on("exit", () => {
    DbOps.releaseDB();
    console.log("Process closed.");
});
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
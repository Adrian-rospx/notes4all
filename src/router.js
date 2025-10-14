import * as DbOps from "./database.js";
import { Router } from "express";
const router = Router();

// global middleware for all apps

// CRUD routes fo notes

// get requests
router.get("/", (req, res) => {
    const notes = DbOps.listNotes();
    
    if (typeof notes === "undefined")
        return res.status(404).send("Note not found");

    const string = notes.map((note) =>
        Object.entries(note)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
    ).join("\n\n");

    res.status(200).send(string);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const note = DbOps.findNote(id);

    if (typeof note === "undefined")
        return res.status(404).send("Note not found.");
        
    const string = Object.entries(note)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    res.status(200).send(string);
});

// post request
router.post("/", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content)
        return res.status(400).send("Bad request. Title and content are required!");

    const result = DbOps.createNote(title, content);
    res.status(201).json({id: result.lastInsertRowid, title, content});
});

router.patch("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const result = DbOps.removeNote(id);

    if (result.changes === 0)
        return res.status(404).send("Note not found");

    res.status(200).send("Resource deleted");
});

export default router;
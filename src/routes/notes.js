import { Router } from "express";
import * as notesService from "../services/notesService.js";

const noteRouter = Router();

// global middleware for all apps

// CRUD routes for notes

// get requests
noteRouter.get("/", (req, res) => {
    const userId = req.user.userId;
    try {
        const string = notesService.getNotes(userId);
        res.status(200).send(string);
    } catch (err) {
        if (err.message === "Error 404")
            return res.status(404).send("Error: Note not found");
        else 
            throw err;
    }
});
noteRouter.get("/:id", (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.userId;
    try {
        const string = notesService.getNote(noteId, userId);
        res.status(200).send(string);
    } catch (err) {
        if (err.message === "Error 404")
            return res.status(404).send("Error: Note not found.");
        else 
            throw err;
    }
});

// post request
noteRouter.post("/", (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
    try {
        const newData = notesService.createNote(title, content, userId);
        res.status(201).json(newData);
    } catch (err) {
        if (err.message === "Error 400")
            return res.status(400)
                .send("Error: Bad request. Title and content are required!");
        else 
            throw err;
    }
});

// patch request
noteRouter.patch("/:id", (req, res) => {
    const noteId = req.params.id;
    const { content } = req.body;
    const userId = req.user.userId;

    try {
        notesService.modifyNote(noteId, content, userId);
        res.status(200).send("Resource updated successfully");
    } catch (err) {
        if (err.message === "Error 400")
            return res.status(400)
                .send("Error: Bad request. Content is required!");
        else if (err.message === "Error 404")
            return res.status(404).send("Error: Note not found.");
        else
            throw err;
    }
});

// delete request 
noteRouter.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.userId;
    try {
        notesService.removeNote(noteId, userId);
        res.status(200).send("Resource deleted successfully");
    } catch (err) {
        if (err.message === "Error 404")
            return res.status(404).send("Error: Note not found.");
        else
            throw err;
    }
});

export default noteRouter;
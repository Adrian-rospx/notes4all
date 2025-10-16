import { Router } from "express";
import * as authService from "../services/authService.js";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = authService.createUser(username, password);
        res.status(201).json(userData);
    } catch (err) {
        if (err.message === "Error 409")
            return res.status(409).send("Conflict. Username already taken!");
        else
            throw err;
    }
});

export default authRouter;
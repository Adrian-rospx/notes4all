import { Router } from "express";
import * as authService from "../services/authService.js";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = authService.registerUser(username, password);
        res.status(201).json(userData);
    } catch (err) {
        if (err.message === "Error 409")
            return res.status(409).send("Conflict. Username already exists.");
        else
            throw err;
    }
});

authRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    try {
        const token = authService.loginUser(username, password);
        res.status(200).json({ token });
    } catch (err) {
        if (err.message === "Error 404")
            return res.status(404).send("Error. User not found");
        else if (err.message === "Error 401")
            return res.status(401).send("Unauthorized. Wrong user or password");
        else
            throw err;
    }
})

export default authRouter;
import * as z from "zod";

// define user input schemas
const UserData = z.object({
    username: z.string().nullish(),
    password: z.string().nullish(),
});

const NoteData = z.object({
    title: z.string().nullish(),
    content: z.string().nullish()
});

export function validateUserData(req, res, next) {
    try {
        req.body = UserData.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(400).send("Error: Bad request");
        else 
            throw err;
    }
}

export function validateNoteData(req, res, next) {
    try {
        req.body = NoteData.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(400).send("Error: Bad request");
        else 
            throw err;
    }
}
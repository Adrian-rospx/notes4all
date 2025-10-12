import express from "express";
import * as DbOps from "./database.js";

const application = express();

const PORT = 3000;

DbOps.initDb();

application.get("/", (req, res) => {
    const string = DbOps.listNotes();

    res.status(200).send(string)
    
    DbOps.releaseDB();
});

application.listen(PORT);

// exit cases
process.on("exit", () => {
    DbOps.releaseDB();
    console.log("Process closed.");
});
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
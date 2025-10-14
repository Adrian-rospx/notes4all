import express from "express";

import { releaseDB } from "./database.js";
import router from "./router.js";

const application = express();

// logging middleware
application.use(express.json());

// router implementation for the notes app API
application.use("/", router);

// error handler
application.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error!");
})

export default application;

// exit process
process.on("exit", () => {
    releaseDB();
    console.log("Process closed.");
});
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
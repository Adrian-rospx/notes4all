import express from "express";

import router from "./routes/notes.js";

const application = express();

application.use(express.json());

// logging middleware
application.use((req, res, next) => {
    const date = new Date().toLocaleString();
    const ip = req.headers['x-forwarded-for'];
    
    console.log(`From ip ${ip} ` + 
                `on date ${date} recieved: ` +
                `${req.method} ${req.url}`);
    next();
})

// mount API router
application.use("/api", router);

// error handler
application.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error!");
})

export default application;

// exit process
process.on("exit", () => {
    console.log("Process closed.");
});
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
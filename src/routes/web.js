import { Router } from "express";
import express from "express";

const webRouter = Router();

webRouter.use(express.static("src/public"));

export default webRouter;
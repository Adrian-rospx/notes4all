import { Router } from "express";
import express from "express";

const webRouter = Router();

webRouter.use(express.static("public"));

export default webRouter;
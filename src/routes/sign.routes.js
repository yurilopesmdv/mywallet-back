import { Router } from "express";
import { signin, signup } from "../controllers/sign.controller.js";

const signRouter = Router()

signRouter.post("/signup", signup)
signRouter.post("/signin", signin)


export default signRouter
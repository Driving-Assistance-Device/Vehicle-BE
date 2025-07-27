import express from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/signup", handleUserSignUp);

export default route;

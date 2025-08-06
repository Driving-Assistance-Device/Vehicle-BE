import express from "express";
import {
  handleDriving,
  handleDrivings,
  handleDrivingTotalCount,
} from "../controllers/driving.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.get("/", verifyAccessToken, handleDriving);
route.get("/total", verifyAccessToken, handleDrivings);
route.get("/total/count", verifyAccessToken, handleDrivingTotalCount);

export default route;

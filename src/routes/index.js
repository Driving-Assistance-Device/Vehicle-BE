import express from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import drivingRoute from "./driving.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/driving", drivingRoute);

export default router;

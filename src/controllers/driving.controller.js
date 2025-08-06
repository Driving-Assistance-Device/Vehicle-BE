import { StatusCodes } from "http-status-codes";
import {
  drivingOne,
  drivingStatistics,
  drivingTotalCount,
} from "../services/driving.service.js";
export const handleDriving = async (req, res, next) => {
  try {
    const user = await drivingOne(req.user.userId);
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    return next(err);
  }
};

export const handleDrivings = async (req, res, next) => {
  try {
    const user = await drivingStatistics(req.user.userId, req.query?.date);
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    return next(err);
  }
};

export const handleDrivingTotalCount = async (req, res, next) => {
  try {
    const user = await drivingTotalCount(req.user.userId);
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    return next(err);
  }
};

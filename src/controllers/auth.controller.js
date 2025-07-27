import { StatusCodes } from "http-status-codes";
import { bodyToSignUp, bodyToSignIn, bodyToRefresh } from "../dtos/auth.dto.js";
import { signUp, signIn, signOut, refresh } from "../services/auth.service.js";

export const handleSignUp = async (req, res, next) => {
  try {
    const auth = await signUp(bodyToSignUp(req.body));
    res.status(StatusCodes.OK).success(auth);
  } catch (err) {
    return next(err);
  }
};
export const handleSignIn = async (req, res, next) => {
  try {
    const auth = await signIn(bodyToSignIn(req.body));
    res.status(StatusCodes.OK).success(auth);
  } catch (err) {
    return next(err);
  }
};
export const handleSignOut = async (req, res, next) => {
  try {
    if (req.user && req.user.userId) {
      const auth = await signOut(req.user.userId);
      res.status(StatusCodes.OK).success(auth);
    } else {
      throw new Error("User not authenticated");
    }
  } catch (err) {
    return next(err);
  }
};
export const handleRefresh = async (req, res, next) => {
  try {
    const auth = await refresh(bodyToRefresh(req.body));
    res.status(StatusCodes.OK).success(auth);
  } catch (err) {
    return next(err);
  }
};
export const handleProtect = async (req, res, next) => {
  try {
    const auth = req.user.userId;
    res.status(StatusCodes.OK).success(auth);
  } catch (err) {
    return next(err);
  }
};

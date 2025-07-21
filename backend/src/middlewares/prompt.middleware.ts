import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import ApiError from "../utils/errors/ApiError";
import { AuthenticatedRequest } from "./auth.middleware"; // ודאי שזו הנתיב הנכון

export const validatePrompt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { prompt, category_id, sub_category_id } = req.body;
  const userId = req.user?.userId;
  console.log("user from req.user:", req.user);

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return next(new ApiError(400, "Prompt text is required."));
  }

  if (!userId) {
    return next(new ApiError(400, "Valid userId is required."));
  }

  if (!category_id || !mongoose.Types.ObjectId.isValid(category_id)) {
    return next(new ApiError(400, "Valid category_id is required."));
  }

  if (!sub_category_id || !mongoose.Types.ObjectId.isValid(sub_category_id)) {
    return next(new ApiError(400, "Valid sub_category_id is required."));
  }

  next();
};

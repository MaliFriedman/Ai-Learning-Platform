import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ApiError from "../utils/errors/ApiError";

export const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
  const { prompt, user_id, category_id, sub_category_id } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return next(new ApiError(400, "Prompt text is required."));
  }

  if (!user_id || typeof user_id !== "string" && ! /^\d{5,15}$/.test(user_id.trim())) {
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


  
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errors/ApiError";
import { isValidCategoryName } from "../utils/validators/param.validators";
import { isValidMongoId } from "../utils/validators/param.validators";

export const validateCategoryCreation = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name || !isValidCategoryName(name)) {
    return next(new ApiError(400, "Name is required and must be a non-empty string with at least 2 characters."));
  }

  next();
};



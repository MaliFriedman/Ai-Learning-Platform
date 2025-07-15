import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errors/ApiError";
import { isValidCategoryName } from "../utils/validators/param.validators";
import { isValidMongoId } from "../utils/validators/param.validators";

export const validateCreateSubCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name, categoryId } = req.body;

  if (!name || !isValidCategoryName(name)) {
    return next(new ApiError(400, "SubCategory name is required and must be valid."));
  }

  if (!categoryId || !isValidMongoId(categoryId)) {
    return next(new ApiError(400, "categoryId is required and must be a valid Mongo ID."));
  }

  next();
};



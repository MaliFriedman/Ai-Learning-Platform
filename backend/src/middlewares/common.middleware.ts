// utils/validators/validateObjectIdParam.ts
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errors/ApiError";
import { isValidMongoId } from "../utils/validators/param.validators";

export const validateObjectIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  if (!id || !isValidMongoId(id)) {
    return next(new ApiError(400, "Invalid or missing sub-category ID."));
  }

  next();
};

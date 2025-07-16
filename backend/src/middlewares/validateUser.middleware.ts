import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errors/ApiError";
import { isValidName, isValidPhone, isValidId } from "../utils/validators/user.validators";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { name, phone, id } = req.body;

  if (!name || !isValidName(name)) {
    return next(new ApiError(400, "Name is required and must be a valid string (2-30 characters)"));
  }

  if (!phone || !isValidPhone(phone)) {
    return next(new ApiError(400, "Phone is required and must be a valid numeric string (9-15 digits)"));
  }

  if (!id || !isValidId(id)) {
    return next(new ApiError(400, "ID is required and must be a numeric string (5-15 digits)"));
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { name, phone } = req.body;

  if (!name || !isValidName(name)) {
    return next(new ApiError(400, "Name is required and must be a valid string (2-30 characters)"));
  }

  if (!phone || !isValidPhone(phone)) {
    return next(new ApiError(400, "Phone is required and must be a valid numeric string (9-15 digits)"));
  }

  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id || req.body.id;

  if (!id || !isValidId(id)) {
    return next(new ApiError(400, "ID is required and must be a numeric string (5-15 digits)"));
  }

  next();
};

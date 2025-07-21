import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errors/ApiError";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    isAdmin?: boolean;
  };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
const token = authHeader?.split(" ")[1];

if (!token) {
  return next(new ApiError(401, "Access token is missing"));
}

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
    console.log("decoded token:", decoded);
    if (err || !decoded.userId) {
      return next(new ApiError(403, "Invalid token"));
    }

req.user = {
  userId: decoded.userId,
  isAdmin: decoded.isAdmin ?? false, 
};
    next();
  });
}

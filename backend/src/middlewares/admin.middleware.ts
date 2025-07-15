import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const JWT_SECRET = process.env.JWT_SECRET!;

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (decoded.name !== ADMIN_NAME || decoded.phone !== ADMIN_PHONE) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

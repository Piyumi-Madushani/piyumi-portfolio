import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  adminId: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured.",
      });

      return;
    }

    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });

      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });

      return;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });

      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../service/auth/jwt";

/**
 * Admin authentication middleware
 * Verifies JWT token and checks for admin role
 */
export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token required",
      });
      return;
    }

    // Verify the token
    const decoded = verifyToken(token);

    // Check if user is admin
    if (decoded.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    // Attach user data to request object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Invalid or expired token",
    });
  }
};

export default adminAuth;

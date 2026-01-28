import { NextFunction, Request, Response } from "express";

/**
 * Middleware to ensure the authenticated user is a student
 * This should be used after the authenticateToken middleware
 */
export const studentAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Check if user is authenticated (should be set by authenticateToken middleware)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Check if the user role is student
    if (req.user.role !== "student") {
      res.status(403).json({
        success: false,
        message: "Access denied. Student authentication required",
      });
      return;
    }

    // User is a student, proceed to next middleware/route
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authorization check failed",
    });
  }
};

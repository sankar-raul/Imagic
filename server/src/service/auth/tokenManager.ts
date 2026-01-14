import { NextFunction, Request, Response } from "express";
import RefreshTokenModel from "../../models/refreshToken/refreshToken.model";
import {
  generateAccessToken,
  generateRefreshToken,
  TokenPayload,
  verifyRefreshToken,
  verifyToken,
} from "./jwt";

/**
 * Login and generate tokens
 * @param payload - User data to encode in tokens
 * @returns Object containing access token and refresh token
 */
export const loginAndGenerateTokens = async (payload: TokenPayload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Calculate expiration date (7 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Store refresh token in database
  await RefreshTokenModel.create({
    userId: payload.userId,
    token: refreshToken,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: "15m",
  };
};

/**
 * Refresh access token using refresh token
 * @param refreshToken - Valid refresh token
 * @returns New access token
 * @throws Error if refresh token is invalid or not found
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  // Verify refresh token exists in database and is not expired
  const storedToken = await RefreshTokenModel.findOne({
    token: refreshToken,
    expiresAt: { $gt: new Date() },
  });

  if (!storedToken) {
    throw new Error("Invalid or expired refresh token");
  }

  // Verify and decode the refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // Generate new access token with the same payload
  const newAccessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  });

  return newAccessToken;
};

/**
 * Logout and invalidate refresh token
 * @param refreshToken - Refresh token to invalidate
 */
export const logout = async (refreshToken: string): Promise<void> => {
  await RefreshTokenModel.deleteOne({ token: refreshToken });
};

/**
 * Logout from all devices (invalidate all refresh tokens for user)
 * @param userId - User ID to logout from all devices
 */
export const logoutAllDevices = async (userId: string): Promise<void> => {
  await RefreshTokenModel.deleteMany({ userId });
};

/**
 * Middleware to authenticate requests using JWT
 */
export const authenticateToken = (
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

    // Attach user data to request object
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  }
};

/**
 * Middleware to check user role
 * @param allowedRoles - Array of roles that can access the route
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
      });
      return;
    }

    next();
  };
};

/**
 * Check if refresh token is valid
 * @param token - Refresh token to check
 * @returns Boolean indicating if token is valid
 */
export const isRefreshTokenValid = async (token: string): Promise<boolean> => {
  const storedToken = await RefreshTokenModel.findOne({
    token,
    expiresAt: { $gt: new Date() },
  });
  return !!storedToken;
};

/**
 * Clean up expired refresh tokens
 * This can be called periodically to remove expired tokens
 */
export const cleanupExpiredTokens = async (): Promise<void> => {
  await RefreshTokenModel.deleteMany({
    expiresAt: { $lt: new Date() },
  });
};

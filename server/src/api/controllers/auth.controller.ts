import bcrypt from "bcrypt";
import { Request, Response } from "express";
import AdminModel from "../../models/admin/admin.model";
import { TokenPayload, verifyToken } from "../../service/auth/jwt";
import {
  loginAndGenerateTokens,
  logout,
  logoutAllDevices,
  refreshAccessToken,
} from "../../service/auth/tokenManager";

/**
 * Login handler - generates access and refresh tokens
 * @param req - Express request
 * @param res - Express response
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }
    // Password validation (add your requirements)
    if (!password || password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }
    const isValidPAssword = await bcrypt.compare(password, admin.password);
    if (!isValidPAssword) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }
    const { id: userId, email: adminEmail } = admin;
    const payload: TokenPayload = {
      userId,
      email,
      role: "admin",
    };

    const tokens = await loginAndGenerateTokens(payload);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: tokens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

/**
 * Refresh token handler - generates new access token
 * @param req - Express request
 * @param res - Express response
 */
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
      return;
    }

    const newAccessToken = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        expiresIn: "15m",
      },
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : "Token refresh failed",
    });
  }
};

/**
 * Logout handler - invalidates refresh token
 * @param req - Express request
 * @param res - Express response
 */
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
      return;
    }

    await logout(refreshToken);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    });
  }
};

/**
 * Logout from all devices handler
 * @param req - Express request
 * @param res - Express response
 */
export const logoutFromAllDevices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    await logoutAllDevices(userId);

    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Logout from all devices failed",
    });
  }
};

/**
 * Verify token handler - validates JWT token
 * @param req - Express request
 * @param res - Express response
 */
export const verifyAuthToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Token is required",
      });
      return;
    }

    const decoded = verifyToken(token);

    res.status(200).json({
      success: true,
      message: "Token is valid",
      data: decoded,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Token verification failed",
    });
  }
};

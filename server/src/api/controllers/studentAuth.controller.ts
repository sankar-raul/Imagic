import { Request, Response } from "express";
import { TokenPayload } from "../../service/auth/jwt";
import {
  loginAndGenerateTokens,
  logout,
  refreshAccessToken,
} from "../../service/auth/tokenManager";
import {
  authenticateStudent,
  findStudentById,
  registerStudent,
  updateStudentPassword,
} from "../../service/studentAuth/studentAuth";

/**
 * Student Registration handler
 * @param req - Express request
 * @param res - Express response
 */
export const studentRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phone, course } = req.body;

    // Validation
    if (!name || !email || !password || !course) {
      res.status(400).json({
        success: false,
        message: "Name, email, password, and course are required",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    // Password validation
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    // Register student
    const student = await registerStudent({
      name,
      email,
      password,
      phone,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: student,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
};

/**
 * Student Login handler - generates access and refresh tokens
 * @param req - Express request
 * @param res - Express response
 */
export const studentLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    // Authenticate student
    const student = await authenticateStudent(email, password);

    // Generate tokens with student role
    const payload: TokenPayload = {
      userId: student._id.toString(),
      email: student.email,
      role: "student",
    };

    const tokens = await loginAndGenerateTokens(payload);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        ...tokens,
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          course: student.course,
          phone: student.phone,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid")) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  }
};

/**
 * Refresh token handler for students
 * @param req - Express request
 * @param res - Express response
 */
export const studentRefreshToken = async (
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
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Token refresh failed",
    });
  }
};

/**
 * Student Logout handler
 * @param req - Express request
 * @param res - Express response
 */
export const studentLogout = async (
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
 * Get student profile handler
 * @param req - Express request
 * @param res - Express response
 */
export const getStudentProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const student = await findStudentById(req.user.userId);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch profile",
    });
  }
};

/**
 * Update student password handler
 * @param req - Express request
 * @param res - Express response
 */
export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
      return;
    }

    await updateStudentPassword(req.user.userId, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("incorrect")) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Password update failed",
      });
    }
  }
};

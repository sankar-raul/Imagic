import { Router } from "express";
import { authenticateToken } from "../../service/auth/tokenManager";
import {
  getStudentProfile,
  studentLogin,
  studentLogout,
  studentRefreshToken,
  studentRegister,
  updatePassword,
} from "../controllers/studentAuth.controller";
import { studentAuthMiddleware } from "../middlewares/studentAuth";

const router = Router();

// Public routes - No authentication required
router.post("/register", studentRegister);
router.post("/login", studentLogin);
router.post("/refresh", studentRefreshToken);

// Protected routes - Require student authentication
router.post("/logout", authenticateToken, studentAuthMiddleware, studentLogout);
router.get(
  "/profile",
  authenticateToken,
  studentAuthMiddleware,
  getStudentProfile
);
router.put(
  "/password",
  authenticateToken,
  studentAuthMiddleware,
  updatePassword
);

export default router;

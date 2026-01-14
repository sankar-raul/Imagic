import { Router } from "express";
import { authenticateToken } from "../../service/auth/tokenManager";
import {
  login,
  logoutFromAllDevices,
  logoutUser,
  refresh,
  verifyAuthToken,
} from "../controllers/auth.controller";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/verify", verifyAuthToken);

// Protected routes (require authentication)
router.post("/logout", authenticateToken, logoutUser);
router.post("/logout-all", authenticateToken, logoutFromAllDevices);

export default router;

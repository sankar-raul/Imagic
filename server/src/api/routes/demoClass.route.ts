import { Router } from "express";
import {
  demoClassForm,
  getDemoClassEntries,
} from "../controllers/demoClass.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();
router.post("/submit", demoClassForm);
router.get("/entries", adminAuth, getDemoClassEntries);

export default router;

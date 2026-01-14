import { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import adminAuth from "../middlewares/adminAuth";
import upload from "../middlewares/upload";

const router = Router();

router.post("/", adminAuth, upload.single("image"), uploadController);
export default router;

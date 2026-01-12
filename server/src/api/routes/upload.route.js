import { Router } from "express"; 
import { uploadController } from "../controllers/upload.controller";
import upload from "../middlewares/upload";

const router = Router();

router.post("/", upload.single("image"), uploadController);
export default router;
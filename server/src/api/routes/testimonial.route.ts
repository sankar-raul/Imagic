import { Router } from "express";
import {
  addTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../controllers/testimonail.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/add", adminAuth, addTestimonial);
router.get("/", getAllTestimonials);
router.put("/:testimonialId", adminAuth, updateTestimonial);
router.delete("/:testimonialId", adminAuth, deleteTestimonial);

export default router;

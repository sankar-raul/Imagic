import { Router } from "express";
import {
  addTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonialByCourseId,
  getTestimonialById,
  updateTestimonial,
} from "../controllers/testimonail.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/add", adminAuth, addTestimonial);
router.get("/", getAllTestimonials);
router.get("/:testimonialId", getTestimonialById);
router.get("/course/:courseId", getTestimonialByCourseId);
router.put("/:testimonialId", adminAuth, updateTestimonial);
router.delete("/:testimonialId", adminAuth, deleteTestimonial);

export default router;

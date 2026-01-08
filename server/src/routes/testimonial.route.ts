import { Router } from "express";
import { addTestimonial, deleteTestimonial, getAllTestimonials, updateTestimonial } from "../controllers/testimonail.controller";

const router = Router();

router.post("/add", addTestimonial);
router.get("/", getAllTestimonials);
router.put("/:testimonialId", updateTestimonial);
router.delete("/:testimonialId", deleteTestimonial);


export default router
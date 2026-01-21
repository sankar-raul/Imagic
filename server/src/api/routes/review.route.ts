import { Router } from "express";
import { addReview, getReviewsByCourseId } from "../controllers/review.controller";

const router = Router();

router.post("/add", addReview );
router.get("/course/:courseId", getReviewsByCourseId );

export default router;
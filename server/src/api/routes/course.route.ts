import { Router } from "express";
import {
  allCourse,
  createCourse,
  deleteCourse,
  getAvailableCourses,
  updateCourse,
  viewCourse,
} from "../controllers/course.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/create", adminAuth, createCourse);
router.get("/available-courses", getAvailableCourses);
router.get("/:courseId", viewCourse);
router.get("/", allCourse);
router.put("/:courseId", adminAuth, updateCourse);
router.delete("/:courseId", adminAuth, deleteCourse);

export default router;

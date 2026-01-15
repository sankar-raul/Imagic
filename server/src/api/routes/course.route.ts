import { Router } from "express";
import {
  allCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  viewCourse,
} from "../controllers/course.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/create", adminAuth, createCourse);
router.get("/:courseId", viewCourse);
router.get("/", allCourse);
router.put("/:courseId", adminAuth, updateCourse);
router.delete("/:courseId", adminAuth, deleteCourse);

export default router;

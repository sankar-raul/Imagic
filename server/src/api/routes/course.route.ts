import { Router } from "express";
import { allCourse, createCourse, deleteCourse, updateCourse, viewCourse } from "../controllers/course.controller";

const router = Router();

router.post("/create", createCourse);
router.get("/:courseId", viewCourse);
router.get("/", allCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);



export default router;
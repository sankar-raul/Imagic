import { Router } from "express";
import {
  addStudentWork,
  deleteStudentWork,
  getAllStudentWorks,
  getStudentWorkById,
  getStudentWorksByCourseId,
  updateStudentWork,
} from "../controllers/studentWork.controller";
import adminAuth from "../middlewares/adminAuth";
const router = Router();

router.post("/", adminAuth, addStudentWork);
router.put("/:id", adminAuth, updateStudentWork);
router.get("/:id", getStudentWorkById);
router.get("/", getAllStudentWorks);
router.delete("/:id", adminAuth, deleteStudentWork);
router.get("/course/:course_id", getStudentWorksByCourseId);

export default router;

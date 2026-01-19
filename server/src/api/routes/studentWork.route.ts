import { Router } from "express";
import {
  addStudentWork,
  deleteStudentWork,
  getAllStudentWorks,
  getStudentWorkById,
  updateStudentWork,
} from "../controllers/studentWork.controller";
import adminAuth from "../middlewares/adminAuth";
const router = Router();

router.post("/", adminAuth, addStudentWork);
router.put("/:id", adminAuth, updateStudentWork);
router.get("/:id", getStudentWorkById);
router.get("/", getAllStudentWorks);
router.delete("/:id", adminAuth, deleteStudentWork);

export default router;

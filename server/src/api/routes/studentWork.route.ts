import { Router } from "express";
import {
  addStudentWork,
  deleteStudentWork,
  getAllStudentWorks,
} from "../controllers/studentWork.controller";
import adminAuth from "../middlewares/adminAuth";
const router = Router();

router.post("/", adminAuth, addStudentWork);
router.get("/", getAllStudentWorks);
router.delete("/:id", adminAuth, deleteStudentWork);

export default router;

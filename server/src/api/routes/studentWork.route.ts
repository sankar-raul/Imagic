import { Router } from "express";
import { addStudentWork, deleteStudentWork, getAllStudentWorks } from "../controllers/studentWork.controller";
const router = Router();

router.post("/", addStudentWork);
router.get("/", getAllStudentWorks);
router.delete("/:id", deleteStudentWork);

export default router;
import { Router } from "express";
import {
  addPlacedStudent,
  deletePlacedStudent,
  getPlacedStudentById,
  getPlacedStudents,
  updatePlacedStudent,
} from "../controllers/placement.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/add", adminAuth, addPlacedStudent);
router.get("/", getPlacedStudents);
router.get("/:placementId", getPlacedStudentById);
router.put("/:placementId", adminAuth, updatePlacedStudent);
router.delete("/:placementId", adminAuth, deletePlacedStudent);

export default router;

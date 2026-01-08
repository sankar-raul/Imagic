import { Router } from "express";
import { addPlacedStudent, deletePlacedStudent, getPlacedStudents, updatePlacedStudent } from "../controllers/placement.controller";

const router = Router();

router.post("/add", addPlacedStudent);
router.get("/", getPlacedStudents);
router.put("/:placementId", updatePlacedStudent);
router.delete("/:placementId", deletePlacedStudent);

export default router;
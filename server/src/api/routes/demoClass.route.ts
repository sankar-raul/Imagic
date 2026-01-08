import { Router } from "express";
import { demoClassForm, getDemoClassEntries } from "../controllers/demoClass.controller";

const router = Router();
router.post("/submit", demoClassForm);
router.get("/entries", getDemoClassEntries);

export default router
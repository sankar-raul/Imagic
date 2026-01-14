import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobsDetails,
  updateJob,
} from "../controllers/job.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();
router.post("/create", adminAuth, createJob);
router.get("/", getAllJobs);
router.get("/:jobId", getJobsDetails);
router.put("/:jobId", adminAuth, updateJob);
router.delete("/:jobId", adminAuth, deleteJob);

export default router;

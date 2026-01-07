import { Router } from "express";
import { createJob, getJobsDetails, getAllJobs, updateJob, deleteJob } from "../controllers/job.controller";

const router = Router();
router.post("/create", createJob);
router.get("/", getAllJobs);
router.get("/:jobId", getJobsDetails);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

export default router;
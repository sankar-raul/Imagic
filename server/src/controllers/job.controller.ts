import { Request, Response } from "express";
import Job from "../models/job.model";

export const createJob = async (req: Request, res: Response) => {
   try {
     const jobData = req.body;
     const job = await Job.create(jobData);
     res.status(201).json(job);
   } catch (error) {
    res.status(500).json({ message: (error as Error).message });
   }
};

export const getJobsDetails = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findOne({ slug: jobId });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

        const skip = (page - 1) * limit;
        const jobs = await Job.find().skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments();
        res.status(200).json({ jobs, totalJobs, page, limit });

        
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;
        const updateData = req.body;
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;
        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

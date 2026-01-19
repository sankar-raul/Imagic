import { Request, Response } from "express";
import Job from "../../models/job/job.model";

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobData = req.body;
    // Generate slug from title
    let slug = jobData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Check if slug exists and append number if needed
    let existingJob = await Job.findOne({ slug });
    let counter = 1;
    while (existingJob) {
        slug = `${jobData.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')}-${counter}`;
        existingJob = await Job.findOne({ slug });
        counter++;
    }

    jobData.slug = slug;
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
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      data: job,
      message: "Job details fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ data: job });
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
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json({ data: jobs, totalJobs, page, limit });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const updateData = req.body;
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ data: updatedJob });
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

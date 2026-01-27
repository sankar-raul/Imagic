import { Request, Response } from "express";
import studentWork from "../../models/studentWork/studentWork.model";

export const addStudentWork = async (req: Request, res: Response) => {
  try {
    const studentWorkData = req.body;
    if (
      !studentWorkData.title ||
      !studentWorkData.studentName ||
      !studentWorkData.videoUrl ||
      !studentWorkData.thumbnailUrl ||
      !studentWorkData.courseId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newStudentWork = await studentWork.create(studentWorkData);

    res.status(201).json({
      message: "Student work added successfully",
      data: newStudentWork,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllStudentWorks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [works, total] = await Promise.all([
      studentWork.find().skip(skip).limit(limit),
      studentWork.countDocuments(),
    ]);

    if (works.length === 0) {
      return res.status(404).json({ message: "No student works found" });
    }

    res.status(200).json({
      data: works,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getStudentWorkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const work = await studentWork.findById(id).skip(0).limit(1);
    if (!work) {
      return res.status(404).json({ message: "Student work not found" });
    }
    res.status(200).json({ data: work });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStudentWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedWork = await studentWork.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({
      message: "Student work updated successfully",
      data: updatedWork,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteStudentWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }
    await studentWork.findByIdAndDelete(id);
    res.status(200).json({ message: "Student work deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

import { Request, Response } from "express";
import student from "../../models/student/student.model";
export const getAllVerifiendStudents = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const students = await student.find({ isVerified: true })
      .skip(skip)
      .limit(limitNumber)
      .select("-password");
    const totalStudents = await student.countDocuments({ isVerified: true });

    res.status(200).json({
      data: students,
      pagination: {
        total: totalStudents,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalStudents / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getPendingVerificationStudents = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const students = await student.find({ isVerified: false })
      .skip(skip)
      .limit(limitNumber)
      .select("-password");
    const totalStudents = await student.countDocuments({ isVerified: false });
    res.status(200).json({
      data: students,
      pagination: {
        total: totalStudents,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalStudents / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const verifyStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentToVerify = (await student.findById(id).select("-password"));
    if (!studentToVerify) {
      return res.status(404).json({ message: "Student not found" });
    }
    studentToVerify.isVerified = true;
    await studentToVerify.save();
    res.status(200).json({ message: "Student verified successfully", data: studentToVerify });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

    
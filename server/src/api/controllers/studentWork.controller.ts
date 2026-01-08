import { Request, Response } from "express";
import studentWork from "../../models/student/studentWork.model";

export const addStudentWork = async (req: Request, res: Response) => {
    try {
       const studentWorkData = req.body;
       if (!studentWorkData.title || !studentWorkData.studentName || !studentWorkData.videoUrl || !studentWorkData.thumbnailUrl || !studentWorkData.courseName) {
           return res.status(400).json({ message: "All fields are required" });
       }
       const newStudentWork = await studentWork.create(studentWorkData);

       res.status(201).json({ message: "Student work added successfully", data: newStudentWork });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getAllStudentWorks = async (req: Request, res: Response) => {
    try {
        const works = await studentWork.find();
        if (works.length === 0) {
            return  res.status(404).json({ message: "No student works found" });
        }
        res.status(200).json({ data: works });
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
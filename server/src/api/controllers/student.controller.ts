import { Request, Response } from "express";
import student from "../../models/student/student.model";
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingStudent = await student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const newStudent = await student.create({ name, email, course });

    res.status(201).json({ message: "Student registered successfully", data: newStudent });
    } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await student.find();
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
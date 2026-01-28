/**
 * Student Authentication Service Layer
 * 
 * This service handles student-specific authentication logic
 * separate from admin authentication.
 */

import bcrypt from "bcrypt";
import StudentModel from "../../models/student/student.model";
import { Istudent } from "../../Types/student.types";

/**
 * Hash password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verify password against hash
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns Boolean indicating if password is valid
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Register a new student
 * @param studentData - Student registration data
 * @returns Created student document
 */
export const registerStudent = async (
  studentData: Partial<Istudent>
): Promise<any> => {
  const { email, password, name, course, phone } = studentData;

  // Check if student already exists
  const existingStudent = await StudentModel.findOne({ email });
  if (existingStudent) {
    throw new Error("Student with this email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password!);

  // Create student
  const student = await StudentModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    course,
    isVerified: false,
  });

  // Return student without password
  const studentObject = student.toObject();
  delete studentObject.password;

  return studentObject;
};

/**
 * Authenticate student with email and password
 * @param email - Student email
 * @param password - Student password
 * @returns Student document if authentication successful
 */
export const authenticateStudent = async (
  email: string,
  password: string
): Promise<any> => {
  // Find student by email
  const student = await StudentModel.findOne({ email });

  if (!student) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, student.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Return student without password
  const studentObject = student.toObject();
  delete studentObject.password;

  return studentObject;
};

/**
 * Find student by ID
 * @param studentId - Student ID
 * @returns Student document without password
 */
export const findStudentById = async (studentId: string): Promise<any> => {
  const student = await StudentModel.findById(studentId).select("-password");
  
  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

/**
 * Update student password
 * @param studentId - Student ID
 * @param oldPassword - Current password
 * @param newPassword - New password
 */
export const updateStudentPassword = async (
  studentId: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const student = await StudentModel.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  // Verify old password
  const isValidPassword = await verifyPassword(oldPassword, student.password);

  if (!isValidPassword) {
    throw new Error("Current password is incorrect");
  }

  // Hash and update new password
  const hashedPassword = await hashPassword(newPassword);
  student.password = hashedPassword;
  await student.save();
};

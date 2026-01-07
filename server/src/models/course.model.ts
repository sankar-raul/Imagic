import { model } from "mongoose";
import { Icourse } from "../Types/course.types";
import CourseSchema from "./course.schema";

export  const Course = model<Icourse>("Course", CourseSchema);
export default Course;
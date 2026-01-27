import { model } from "mongoose";
import { Istudent } from "../../Types/student.types";
import studentSchema from "./student.schema";

const student = model<Istudent>("Student", studentSchema);

export default student;
import { Schema } from "mongoose";
import { Istudent } from "../../Types/student.types";

const student = new Schema<Istudent>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    cv: { type: String, required: true },
});

export default student;
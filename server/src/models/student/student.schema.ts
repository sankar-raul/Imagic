import { Schema } from "mongoose";
import { Istudent } from "../../Types/student.types";

const student = new Schema<Istudent>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    course: { type: String, required: true },
    cv: { type: String },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export default student;
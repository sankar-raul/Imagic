import { Schema } from "mongoose";
import { Iwork } from "../../Types/work.types";

const workSchema = new Schema<Iwork>({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    link: { type: String, required: true },
});

export default workSchema;
import { IStudentWork } from "../../Types/studentWork.types";
import { Schema } from "mongoose";

const studentWorkSchema = new Schema<IStudentWork>({
    title: { type: String, required: true },
    studentName: { type: String, required: true },
    videoUrl: { type: String },
    thumbnailUrl: { type: String, required: true },
    courseId: { type: String, required: true },
})

export default studentWorkSchema;
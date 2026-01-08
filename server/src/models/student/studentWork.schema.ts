import { IStudentWork } from "../../Types/studentWork.types";
import { Schema } from "mongoose";

const studentWorkSchema = new Schema<IStudentWork>({
    title: { type: String, required: true },
    studentName: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    courseName: { type: String, required: true },
})

export default studentWorkSchema;
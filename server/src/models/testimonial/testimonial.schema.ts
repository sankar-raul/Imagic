import { Schema } from "mongoose";
import { Itestimonial } from "../../Types/testimonials.types";

const testimonialSchema = new Schema<Itestimonial>({
    studentName: { type: String, required: true },
    studentPhoto: { type: String, required: true },
    feedback: { type: String, required: true },
    jobTitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    companyName: { type: String, required: true },
})

export default testimonialSchema;
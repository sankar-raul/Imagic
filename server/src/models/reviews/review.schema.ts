import { Schema } from "mongoose";

export const reviewSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    courseId: { type: String, required: true },
});

export default reviewSchema;
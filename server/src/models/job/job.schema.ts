import { Schema } from "mongoose";

export const jobSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    jobDetails: {
        type: String,
        required: true
    },
    posted_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
export default jobSchema;
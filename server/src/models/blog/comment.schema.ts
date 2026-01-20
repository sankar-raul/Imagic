import { Schema } from "mongoose";

const commentSchema = new Schema({
    blogId: { type: String, required: true },
    commenterName: { type: String, required: true },
    commenterEmail: { type: String },
    commentText: { type: String, required: true },
    commentedAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
})

export default commentSchema;
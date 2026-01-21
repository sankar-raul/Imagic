import { Schema } from "mongoose";

const commentSchema = new Schema({
  blogId: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String },
  content: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now },
  rating: { type: Number, required: true },
  likes: { type: Number, default: 0 },
});

export default commentSchema;

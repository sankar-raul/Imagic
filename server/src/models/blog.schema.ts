import { Schema } from "mongoose";
import { Iblog } from "../Types/blog.types";

const blogSchema = new Schema<Iblog>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    short_description: { type: String, required: true },
    posted_date: { type: Date, default: Date.now },
    content: { type: String, required: true },
})

export default blogSchema;
import { model } from "mongoose";
import blogSchema from "./blog.schema";
import { Iblog } from "../Types/blog.types";

const blog = model<Iblog>("blog", blogSchema)
export default blog;

import { model } from "mongoose";
import commentSchema from "./comment.schema";
import { Icomment } from "../../Types/comment.types";


const comment = model<Icomment>("comment", commentSchema);
export default comment;
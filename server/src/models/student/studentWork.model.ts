import { model } from "mongoose";
import { IStudentWork } from "../../Types/studentWork.types";
import studentWorkSchema from "./studentWork.schema";

const studentWork = model<IStudentWork>("StudentWork", studentWorkSchema);

export default studentWork;
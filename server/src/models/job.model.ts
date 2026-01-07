import { model } from "mongoose";
import { Ijob } from "../Types/job.types";
import jobSchema from "./job.schema";

export const Job = model<Ijob>("Job", jobSchema);
export default Job;
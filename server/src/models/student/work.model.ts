import { model } from "mongoose";
import workSchema from "./work.schema";
import { Iwork } from "../../Types/work.types";

const work = model<Iwork>("Work", workSchema);

export default work;
import { model } from "mongoose";
import { IdemoClass } from "../../Types/demoClass.types";
import demoClassSchema from "./demoClass.schema";

const demoClass = model<IdemoClass>("demoClass", demoClassSchema)
export default demoClass;
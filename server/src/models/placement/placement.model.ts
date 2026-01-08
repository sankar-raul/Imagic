import { model } from "mongoose";
import { Iplacement } from "../../Types/placement.types";
import placementSchema from "./placement.schema";

const Placement = model<Iplacement>("Placement", placementSchema)
export default Placement;
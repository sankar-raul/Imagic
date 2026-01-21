import { model } from "mongoose";
import { Ireview } from "../../Types/review.types";
import reviewSchema from "./review.schema";

const review = model<Ireview>("review", reviewSchema);

export default review;
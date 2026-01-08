import { model } from "mongoose";
import { Itestimonial } from "../Types/testimonials.types";
import testimonialSchema from "./testimonial.schema";

const testimonial = model<Itestimonial>("testimonial", testimonialSchema)
export default testimonial;
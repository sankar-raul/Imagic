import { Schema } from "mongoose";
import { INewsletter } from "../../Types/newsletter.types";

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  subscribedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export default newsletterSchema;

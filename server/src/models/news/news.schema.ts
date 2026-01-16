import { Schema } from "mongoose";
import { Inews } from "../../Types/news.types";

const newsSchema = new Schema<Inews>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  published_date: { type: Date, required: true },
});

export default newsSchema;

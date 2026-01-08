import { model } from "mongoose";
import { Inews } from "../../Types/news.types";
import newsSchema from "./news.schema";

const news = model<Inews>("news", newsSchema);
export default news;

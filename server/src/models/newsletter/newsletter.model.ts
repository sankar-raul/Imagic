import { model } from "mongoose";
import { INewsletter } from "../../Types/newsletter.types";
import newsletterSchema from "./newsletter.schema";

const Newsletter = model<INewsletter>("Newsletter", newsletterSchema);
export default Newsletter;

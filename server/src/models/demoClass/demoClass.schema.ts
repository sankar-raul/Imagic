import { Schema } from "mongoose";
import { IdemoClass } from "../../Types/demoClass.types";

const demoClassSchema = new Schema<IdemoClass>({ 
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    courseInterested: {
        type: String,
        required: true
    }
});
export default demoClassSchema;
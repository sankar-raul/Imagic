import { Schema } from "mongoose";

const placementSchema =  new Schema({
    studentName: {
        type: String,
        required: true
    },
    studentPhoto: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
export default placementSchema;
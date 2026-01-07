import {Schema} from "mongoose";

const courseDetailsSchema = new Schema(
{
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    start_on: { type: Date, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    branch: { type: String, required: true }
},
{ _id: false }
);

const courseToolsSchema = new Schema(
{
    name: { type: String, required: true },
    description: { type: String }
},
{ _id: false }
);

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    short_description: {
        type: String,
        required: true
    },
    courseDetails: courseDetailsSchema ,
    course_overview: {
        type: String,
        required: true
    },
    courseSyllabus: [{
        title: { type: String, required: true },
        description: { type: String },
        tools: [courseToolsSchema]
    }],
    students_work: [{
        tool: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    }],
    reviews: [{
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true }
    }],
    students_testimonials: [{
        name: { type: String, required: true },
        designation: { type: String, required: true },
        testimonial: { type: String, required: true },
        image: { type: String, required: true },
        video: { type: String }
    }]
});
export default CourseSchema;

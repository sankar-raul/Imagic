import { ObjectId } from "mongoose";

export interface Iwork {
    studentId: ObjectId;
    title: string;
    type: string;
    image: string;
    video: string;
    link: string;
}
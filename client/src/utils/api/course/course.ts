import { get } from "../apiMethod";

const INITIAL_ROUTE = '/courses';
export const getAllCourses = async () => {

    try {
        const response = await get('/data/courseData.json');
        return response;
    } catch (error) {
        throw error;
    }
}
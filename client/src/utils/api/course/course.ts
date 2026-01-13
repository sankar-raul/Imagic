import { get, post } from "../apiMethod";

const INITIAL_ROUTE = '/courses';
export const getAllCourses = async () => {

    try {
        const response = await get('/data/courseData.json');
        return response;
    } catch (error) {
        throw error;
    }
}
export const createCourse = async (courseData: any) => {

    try {
        const response = await post(`${INITIAL_ROUTE}/create`, courseData);
        return response;
    } catch (error) {
        throw error;
    }
}
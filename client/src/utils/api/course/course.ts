import { deleteRequest, get, post } from "../apiMethod";

const INITIAL_ROUTE = "/courses";
export const getAllCourses = async () => {
  try {
    const response = await get(INITIAL_ROUTE + "/");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCourseById = async (courseId: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/${courseId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const createCourse = async (courseData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}/create`, courseData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${courseId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

import { deleteRequest, get, post, put } from "../apiMethod";
const INITIAL_ROUTE = "/student-works";

// Get student works by course id with pagination
export const getStudentWorksByCourseId = async (
  courseId: string,
  filter?: { page?: number; limit?: number },
) => {
  try {
    const response = await get(`/student-works/course/${courseId}`, filter);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllStudentWorks = async (filter?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await get(`${INITIAL_ROUTE}`, filter);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addStudentWork = async (studentWorkData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}`, studentWorkData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteStudentWork = async (id: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStudentWorkById = async (id: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateStudentWork = async (id: string, studentWorkData: any) => {
  try {
    const response = await put(`${INITIAL_ROUTE}/${id}`, studentWorkData);
    return response;
  } catch (error) {
    throw error;
  }
};

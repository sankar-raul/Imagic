import { get, put } from "../apiMethod";

const INITIAL_ROUTE = "/students";
export const getAllVerifiedStudents = async () => {
  try {
    const response = await get(INITIAL_ROUTE + "/verified");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllPendingStudents = async () => {
  try {
    const response = await get(INITIAL_ROUTE + "/pending");
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyStudent = async (studentId: string, studentData: any) => {
  try {
    const response = await put(`${INITIAL_ROUTE}/verify/${studentId}`, studentData);
    return response;
  } catch (error) {
    throw error;
  }
};
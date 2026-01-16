import { get, post, deleteRequest } from "../apiMethod";

const INITIAL_ROUTE = "/jobs";
export const getAllJobs = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await get(`${INITIAL_ROUTE}?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const createJob = async (jobData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}/create`, jobData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${jobId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJobBySlug = async (slug: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/${slug}`);
    return response;
  } catch (error) {
    throw error;
  }
};

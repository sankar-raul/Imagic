import { get, post, deleteRequest } from "../apiMethod";

const INITIAL_ROUTE = "/testimonials";
export const getAllTestimonial = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await get(`${INITIAL_ROUTE}?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addTestimonial = async (testimonialData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}/add`, testimonialData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTestimonial = async (testimonialId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${testimonialId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

import { get, post, deleteRequest, put } from "../apiMethod";

const INITIAL_ROUTE = "/blogs";

export const getAllBlogs = async () => {
  try {
    const response = await get(`${INITIAL_ROUTE}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postBlog = async (blogData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}`, blogData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (blogId: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/id/${blogId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/${slug}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (blogId: string, blogData: any) => {
  try {
    const response = await put(`${INITIAL_ROUTE}/${blogId}`, blogData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${blogId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

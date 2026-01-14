import {get, post} from "../apiMethod";

const INITIAL_ROUTE = '/blogs';

export const getAllBlogs = async () => {
    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const postBlog = async (blogData: any) => {
    try {
        const response = await post(`${INITIAL_ROUTE}`, blogData);
        return response;
    } catch (error) {
        throw error;
    }
}

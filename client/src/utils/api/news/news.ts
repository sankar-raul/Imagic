import {get, post} from "../apiMethod";

const INITIAL_ROUTE = '/news';

export const getAllNews = async () => {
    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const postNews = async (newsData: any) => {
    try {
        const response = await post(`${INITIAL_ROUTE}`, newsData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteNews = async (id: string) => {
    try {
        const response = await post(`${INITIAL_ROUTE}/delete/${id}`, {});
        return response;
    } catch (error) {
        throw error;
    }
}

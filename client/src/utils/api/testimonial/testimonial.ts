import { get, post, deleteRequest} from "../apiMethod";

const INITIAL_ROUTE = '/testimonials';
export const getAllTestimonial = async () => {

    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}
export const addTestimonial = async (testimonialData: any) => {

    try {
        const response = await post(`${INITIAL_ROUTE}/add`, testimonialData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteTestimonial = async (testimonialId: string) => {

    try {
        const response = await deleteRequest(`${INITIAL_ROUTE}/${testimonialId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
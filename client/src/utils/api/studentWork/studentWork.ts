import {get, post} from "../apiMethod";

const INITIAL_ROUTE = '/student-works';

export const getAllStudentWorks = async () => {
    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addStudentWork = async (studentWorkData: any) => {
    try {
        const response = await post(`${INITIAL_ROUTE}`, studentWorkData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteStudentWork = async (id: string) => {
    try {
        const response = await post(`${INITIAL_ROUTE}/delete/${id}`, {});
        return response;
    } catch (error) {
        throw error;
    }
}

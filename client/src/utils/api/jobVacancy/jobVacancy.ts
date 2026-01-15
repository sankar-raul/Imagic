import { get, post, deleteRequest} from "../apiMethod";

const INITIAL_ROUTE = '/jobs';
export const getAllJobs = async () => {

    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}
export const createJob = async (jobData: any) => {

    try {
        const response = await post(`${INITIAL_ROUTE}/create`, jobData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteJob = async (jobId: string) => {

    try {
        const response = await deleteRequest(`${INITIAL_ROUTE}/${jobId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
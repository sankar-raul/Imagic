import { get, post, deleteRequest} from "../apiMethod";

const INITIAL_ROUTE = '/placements';
export const getAllPlacement = async () => {

    try {
        const response = await get(`${INITIAL_ROUTE}`);
        return response;
    } catch (error) {
        throw error;
    }
}
export const addPlacement = async (placementData: any) => {

    try {
        const response = await post(`${INITIAL_ROUTE}/add`, placementData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deletePlacement = async (placementId: string) => {

    try {
        const response = await deleteRequest(`${INITIAL_ROUTE}/${placementId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
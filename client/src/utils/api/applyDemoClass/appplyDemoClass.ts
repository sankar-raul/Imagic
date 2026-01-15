import { IdemoClass } from "@/@types/interface/demoClass.interface";
import { post, get, deleteRequest } from "../apiMethod"

const INITIAL_ROUTE = '/demo-class';
export const applyDemoClass = async (formData:IdemoClass) => {
    try {
        const response = await post(`${INITIAL_ROUTE}/submit`, formData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const demoClassEntries = async () => {
    try {
        const response = await get(`${INITIAL_ROUTE}/entries`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteDemoClassEntry = async (demoClassEntryId: string) => {
    try {
      const response = await deleteRequest(`${INITIAL_ROUTE}/${demoClassEntryId}`);
        return response;
    
    } catch (error) {
      throw error;
    }
    };
import { IdemoClass } from "@/@types/interface/demoClass.interface";
import { post } from "../apiMethod"

const INITIAL_ROUTE = '/demo-class';
export const applyDemoClass = async (formData:IdemoClass) => {
    try {
        const response = await post(`${INITIAL_ROUTE}/apply`, formData);
        return response;
    } catch (error) {
        throw error;
    }
}
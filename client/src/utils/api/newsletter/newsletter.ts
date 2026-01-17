import { post, deleteRequest, get } from "../apiMethod";

const INITIAL_ROUTE = "/newsletter";

export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await post(`${INITIAL_ROUTE}/subscribe`, { email });
    return response;
  } catch (error) {
    throw error;
  }
};

export const unsubscribeNewsletter = async (email: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/unsubscribe`, {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllSubscribers = async () => {
  try {
    const response = await get(`${INITIAL_ROUTE}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSubscriber = async (subscriberId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${subscriberId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

import { get, post, deleteRequest, put } from "../apiMethod";

const INITIAL_ROUTE = "/placements";
export const getAllPlacement = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await get(`${INITIAL_ROUTE}?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addPlacement = async (placementData: any) => {
  try {
    const response = await post(`${INITIAL_ROUTE}/add`, placementData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePlacement = async (placementId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_ROUTE}/${placementId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPlacementById = async (placementId: string) => {
  try {
    const response = await get(`${INITIAL_ROUTE}/${placementId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePlacement = async (placementId: string, placementData: any) => {
  try {
    const response = await put(`${INITIAL_ROUTE}/${placementId}`, placementData);
    return response;
  } catch (error) {
    throw error;
  }
};

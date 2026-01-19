import { api } from "@/utils/api";
import { useState } from "react";

const useUpdatePlacement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updatePlacement = async (placementId: string, placementData: any) => {
    try {
      setIsLoading(true);
      const response = await api.placements.updatePlacement(placementId, placementData);
      return response;
    } catch (error: any) {
        console.error("Error updating placement:", error);
        throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updatePlacement, isLoading };
};

export default useUpdatePlacement;

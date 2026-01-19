import { api } from "@/utils/api";
import { Iplacement } from "@/types/placement.types";
import { useEffect, useState } from "react";

const useGetPlacementById = (placementId: string) => {
  const [placement, setPlacement] = useState<Iplacement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlacement = async () => {
      if (!placementId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.placements.getPlacementById(placementId);
        setPlacement(response?.data || response);
      } catch (error: any) {
        console.error("Error fetching placement:", error);
        setError(error.message || "Failed to fetch placement");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlacement();
  }, [placementId]);

  return { placement, isLoading, error };
};

export default useGetPlacementById;

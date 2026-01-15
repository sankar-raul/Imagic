import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { IdemoClass } from "@/types/demoClass.types";

const useDemoClassEntries = () => {
  const [demoClassEntries, setDemoClassEntries] = useState<IdemoClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDemoClassEntries = async () => {
    try {
      setIsLoading(true);
      const response = await api.demoClass.demoClassEntries();
      setDemoClassEntries(response || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDemoClassEntries();
  }, []);

  return {
    demoClassEntries,
    isLoading,
    refetchDemoClassEntries: fetchDemoClassEntries,
  };
};

export default useDemoClassEntries;

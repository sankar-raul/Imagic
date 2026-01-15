import { api } from "@/utils/api";
const useDeleteDemoClassEntry = () => {
  const deleteDemoClassEntryById = async (demoClassEntryId: string) => {
    try {
      const response = await api.demoClass.deleteDemoClassEntry(demoClassEntryId);
        return response;
      
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };
  return {
    deleteDemoClassEntryById,
  };
};

export default useDeleteDemoClassEntry;

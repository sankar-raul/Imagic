import { api } from "@/utils/api";

const useDeleteBlog = () => {
  const deleteBlogById = async (blogId: string) => {
    try {
      const response = await api.blog.deleteBlog(blogId);
      return response;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };
  return {
    deleteBlogById,
  };
};

export default useDeleteBlog;

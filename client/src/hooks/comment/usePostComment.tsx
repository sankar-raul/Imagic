import { useState } from "react";
import { CommentFormData, IComment } from "@/types/comment.types";
import { api } from "@/utils/api";

const usePostComment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postComment = async (
    formData: CommentFormData,
  ): Promise<IComment | null> => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Mock API call - replace with actual API when backend is ready
      // const response = await api.comment.postComment(formData);
      // return response.data;

      // Mock response for now
      const mockComment: IComment = {
        _id: Date.now().toString(),
        blogId: formData.blogId,
        author: formData.author,
        email: formData.email,
        content: formData.content,
        createdAt: new Date().toISOString(),
        replies: [],
        parentId: formData.parentId || null,
      };

      return mockComment;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to post comment";
      setError(errorMessage);
      console.error("Error posting comment:", err);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    postComment,
    isSubmitting,
    error,
  };
};

export default usePostComment;

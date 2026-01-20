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
      const response = await api.comment.commentOnBlogPost(
        formData.blogId,
        formData,
      );
      return response || ({} as IComment);
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

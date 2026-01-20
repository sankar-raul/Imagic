import { useState, useEffect } from "react";
import { IComment } from "@/types/comment.types";
import { api } from "@/utils/api";

const useGetComments = (blogId: string | undefined) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) {
      setIsLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.comment.getBlogComments(blogId);
        setComments(response || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load comments",
        );
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  const addComment = (comment: IComment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
  };
};

export default useGetComments;

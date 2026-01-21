import { useState, useEffect, useCallback } from "react";
import { IComment } from "@/types/comment.types";
import { api } from "@/utils/api";

interface CommentsResponse {
  comments: IComment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    limit: number;
  };
}

const useGetComments = (
  blogId: string | undefined,
  initialLimit: number = 5,
) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchComments = useCallback(
    async (page: number, append: boolean = false) => {
      if (!blogId) {
        setIsLoading(false);
        return;
      }

      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        const response = await api.comment.getBlogComments(
          blogId,
          page,
          initialLimit,
        );

        // Check if response has pagination structure
        if (
          response &&
          typeof response === "object" &&
          "comments" in response
        ) {
          const data = response as CommentsResponse;
          if (append) {
            setComments((prev) => [...prev, ...data.comments]);
          } else {
            setComments(data.comments || []);
          }
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
          setTotalComments(data.pagination.totalComments);
          setHasMore(data.pagination.currentPage < data.pagination.totalPages);
        } else {
          // Fallback for non-paginated response
          const commentsList = Array.isArray(response) ? response : [];
          if (append) {
            setComments((prev) => [...prev, ...commentsList]);
          } else {
            setComments(commentsList);
          }
          setHasMore(false);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load comments",
        );
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [blogId, initialLimit],
  );

  useEffect(() => {
    setComments([]);
    setCurrentPage(1);
    fetchComments(1, false);
  }, [blogId, fetchComments]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextPage = currentPage + 1;
      fetchComments(nextPage, true);
    }
  }, [currentPage, hasMore, isLoadingMore, fetchComments]);

  const addComment = (comment: IComment) => {
    setComments((prev) => [comment, ...prev]);
    setTotalComments((prev) => prev + 1);
  };

  return {
    comments,
    isLoading,
    isLoadingMore,
    error,
    currentPage,
    totalPages,
    totalComments,
    hasMore,
    loadMore,
    addComment,
  };
};

export default useGetComments;

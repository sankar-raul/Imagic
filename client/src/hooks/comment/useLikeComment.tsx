import { api } from "@/utils/api";
import { useState } from "react";

interface UseLikeCommentReturn {
  isLiked: boolean;
  likeCount: number;
  toggleLike: () => Promise<void>;
  isLoading: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLikeComment = (
  commentId: string,
  initialLikes: number = 0,
): UseLikeCommentReturn => {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    // Check localStorage for previous like state
    return localStorage.getItem(`comment_liked_${commentId}`) === "true";
  });
  const [likeCount, setLikeCount] = useState<number>(initialLikes);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLike = async () => {
    try {
      setIsLoading(true);

      // Mock API call - replace with actual API when backend is ready
      // await api.comment.toggleLike(commentId);
      await api.comment.likeComment(commentId, isLiked ? "dislike" : "like");
      const newLikedState = !isLiked;
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      // Store in localStorage
      localStorage.setItem(
        `comment_liked_${commentId}`,
        newLikedState.toString(),
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likeCount,
    toggleLike,
    isLoading,
    setIsLiked,
  };
};

export default useLikeComment;

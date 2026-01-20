import { useState } from "react";

interface UseLikeBlogReturn {
  isLiked: boolean;
  likeCount: number;
  toggleLike: () => Promise<void>;
  isLoading: boolean;
}

const useLikeBlog = (
  blogId: string,
  initialLikes: number = 0,
): UseLikeBlogReturn => {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    // Check localStorage for previous like state
    return localStorage.getItem(`blog_liked_${blogId}`) === "true";
  });
  const [likeCount, setLikeCount] = useState<number>(initialLikes);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLike = async () => {
    try {
      setIsLoading(true);

      // Mock API call - replace with actual API when backend is ready
      // await api.blog.toggleLike(blogId);

      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      // Store in localStorage
      localStorage.setItem(`blog_liked_${blogId}`, newLikedState.toString());
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
  };
};

export default useLikeBlog;

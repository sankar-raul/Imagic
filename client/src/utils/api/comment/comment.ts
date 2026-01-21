import { CommentFormData, IComment } from "@/types";
import { deleteRequest, get, post } from "../apiMethod";

const INITIAL_rOUTE = "/comments";
export const commentOnBlogPost = async (
  blogId: string,
  comment: CommentFormData,
) => {
  try {
    const response = await post(`${INITIAL_rOUTE}/${blogId}`, comment);
    return response.data;
  } catch (error) {
    console.error("Error commenting on blog post:", error);
    throw error;
  }
};
export const likeComment = async (
  commentId: string,
  action: "like" | "dislike",
) => {
  try {
    const response = await post(`${INITIAL_rOUTE}/${commentId}/like`, {
      action,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
};
export const deleteComment = async (commentId: string) => {
  try {
    const response = await deleteRequest(`${INITIAL_rOUTE}/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
export const getBlogComments = async (
  blogId: string,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const response = await get(
      `${INITIAL_rOUTE}/blog/${blogId}?page=${page}&limit=${limit}`,
      {},
    );
    return response;
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    throw error;
  }
};

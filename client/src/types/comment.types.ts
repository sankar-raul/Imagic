export interface IComment {
  _id: string;
  blogId: string;
  author: string;
  email: string;
  content: string;
  commentedAt: string;
  likes?: number;
}

export interface CommentFormData {
  author: string;
  email: string;
  content: string;
  blogId: string;
}

export interface CommentResponse {
  success: boolean;
  data: IComment[];
  message?: string;
}

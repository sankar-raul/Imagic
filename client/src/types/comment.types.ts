export interface IComment {
  _id: string;
  blogId: string;
  author: string;
  email: string;
  content: string;
  comentedAt: string;
  likes?: number;
}

export interface CommentFormData {
  author: string;
  email: string;
  content: string;
  blogId: string;
  parentId?: string | null;
}

export interface CommentResponse {
  success: boolean;
  data: IComment[];
  message?: string;
}

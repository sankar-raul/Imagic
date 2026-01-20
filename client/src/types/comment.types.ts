export interface IComment {
  _id: string;
  blogId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  replies?: IComment[];
  parentId?: string | null;
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

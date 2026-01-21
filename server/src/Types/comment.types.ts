export interface Icomment {
  blogId: string;
  author: string;
  email: string;
  content: string;
  commentedAt: string;
  rating: number;
  likes?: number;
}

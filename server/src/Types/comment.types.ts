export interface Icomment {
    blogId: string;
    commenterName: string;
    commenterEmail: string;
    commentText: string;
    commentedAt: Date;
    likes?: number;
}
import { ICommentModel } from "@/models/implementation/comment.model";

export interface RepliesServiceResponse {
  comments: ICommentModel[]; 
  totalPages: number;
  totalCount: number;
}

export interface ICommentService {
  createComment(commentData: {
    blogId: string;
    userId: string;
    content: string;
    parentId?: string | null;
  }): Promise<ICommentModel>;
  toggleLikeComment(
    commentId: string,
    userId: string
  ): Promise<{ likes: number; liked: boolean }>;

  getTopLevelComments(
    blogId: string,
    page: number,
    limit: number
  ): Promise<RepliesServiceResponse>;
  getReplies(
    parentId: string,
    page: number,
    limit: number
  ): Promise<RepliesServiceResponse>; 
}

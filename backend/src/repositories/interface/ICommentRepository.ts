import { Types, UpdateQuery } from "mongoose";
import { BaseRepository } from "../base.repository";
import { ICommentModel } from "@/models/implementation/comment.model";

export interface ITopLevelCommentAggregated extends ICommentModel {
  totalDescendantCount: number;
}

export interface ICommentRepository extends BaseRepository<ICommentModel> {
  createComment(commentData: Partial<ICommentModel>): Promise<ICommentModel>;

  findTopLevelByBlogId(
    blogId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ comments: ITopLevelCommentAggregated[]; totalCount: number }>;

  findRepliesByParentId(
    parentId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ comments: ICommentModel[]; totalCount: number }>;

  findCommentById(commentId: Types.ObjectId): Promise<ICommentModel | null>;

  updateComment(
    commentId: Types.ObjectId,
    update: UpdateQuery<ICommentModel>
  ): Promise<ICommentModel | null>;
}

import {
  ICommentRepository,
  ITopLevelCommentAggregated,
} from "@/repositories/interface/ICommentRepository";
import { Types, UpdateQuery } from "mongoose";
import { BaseRepository } from "../base.repository";
import Comment, { ICommentModel } from "@/models/implementation/comment.model";

interface FindTopLevelCommentsResult {
  comments: ITopLevelCommentAggregated[];
  totalCount: number;
}
interface FacetResult {
  paginatedResults: ITopLevelCommentAggregated[];
  totalCount: Array<{ count: number }>;
}

export class CommentRepository
  extends BaseRepository<ICommentModel>
  implements ICommentRepository
{
  constructor() {
    super(Comment);
  }

  async createComment(
    commentData: Partial<ICommentModel>
  ): Promise<ICommentModel> {
    const newComment = await this.create(commentData);
    return newComment;
  }

  async findTopLevelByBlogId(
    blogId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<FindTopLevelCommentsResult> {
    const query = { blogId, parentId: null };
    const aggregation = this.model.aggregate<FacetResult>([
      {
        $match: query,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          paginatedResults: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "comments",
                let: { commentId: "$_id", commentBlogId: "$blogId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$blogId", "$$commentBlogId"] },
                          {
                            $or: [{ $eq: ["$parentId", "$$commentId"] }],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "directReplies",
              },
            },
            {
              $graphLookup: {
                from: "comments",
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "parentId",
                as: "allDescendants",
                maxDepth: 100,
                restrictSearchWithMatch: { blogId },
              },
            },
            {
              $addFields: {
                totalDescendantCount: { $size: "$allDescendants" },
              },
            },
            {
              $project: {
                allDescendants: 0,
                directReplies: 0,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);
    
    const result = await aggregation.exec();

    const paginatedResults = result[0]?.paginatedResults || [];
    const totalCount = result[0]?.totalCount[0]?.count || 0;

    return {
      comments: paginatedResults as ITopLevelCommentAggregated[],
      totalCount,
    };
  }

  async findRepliesByParentId(
    parentId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ replies: ICommentModel[]; totalCount: number }> {
    const parentObjectId =
      typeof parentId === "string" ? new Types.ObjectId(parentId) : parentId;
    const descendantsAggregation = await this.model
      .aggregate([
        {
          $match: { _id: parentObjectId },
        },
        {
          $graphLookup: {
            from: "comments",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentId",
            as: "allDescendants",
            maxDepth: 100,
          },
        },
        {
          $project: {
            _id: 0,
            allDescendants: 1,
          },
        },
        {
          $unwind: "$allDescendants",
        },
        {
          $replaceRoot: { newRoot: "$allDescendants" },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $facet: {
            paginatedResults: [{ $skip: skip }, { $limit: limit }],
            totalCount: [{ $count: "count" }],
          },
        },
      ])
      .exec();

    const descendants = descendantsAggregation[0]?.paginatedResults || [];
    const totalCount = descendantsAggregation[0]?.totalCount[0]?.count || 0;

    return {
      replies: descendants as ICommentModel[],
      totalCount,
    };
  }

  async findCommentById(
    commentId: Types.ObjectId
  ): Promise<ICommentModel | null> {
    return this.findById(commentId);
  }

  async updateComment(
    commentId: Types.ObjectId,
    update: UpdateQuery<ICommentModel>
  ): Promise<ICommentModel | null> {
    return this.model
      .findByIdAndUpdate(commentId, update, { new: true })
      .exec();
  }

  async updateUsername(userId: string, username: string): Promise<void> {
    await Comment.updateMany({ userId }, { username: username })
  }

  async updateProfilePicture(userId: string, profileUrl: string): Promise<void> {
    await Comment.updateMany({ userId }, { profilePicture: profileUrl })
  }
}

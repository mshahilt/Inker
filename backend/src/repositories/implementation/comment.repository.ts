import {
  ICommentRepository,
  ITopLevelCommentAggregated,
} from "@/repositories/interface/ICommentRepository";
import { Types, UpdateQuery } from "mongoose";
import { BaseRepository } from "../base.repository";
import Comment, { ICommentModel } from "@/models/implementation/comment.model";

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
    await newComment.populate("userId", "username profilePicture");
    return newComment;
  }

  async findTopLevelByBlogId(
    blogId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ comments: ITopLevelCommentAggregated[]; totalCount: number }> {
    const query = { blogId, parentId: null };
    const aggregation = this.model.aggregate([
      {
        $match: query,
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $facet: {
          paginatedResults: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentId",
                as: "replies",
              },
            },
            {
              $addFields: {
                totalDescendantCount: { $size: "$replies" },
              },
            },
            {
              $project: {
                replies: 0,
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $addFields: {
                user: {
                  _id: "$user._id",
                  username: "$user.username",
                  profilePicture: "$user.profilePicture",
                },
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

    return { comments: paginatedResults, totalCount };
  }

  async findRepliesByParentId(
    parentId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ comments: ICommentModel[]; totalCount: number }> {
    const replyQuery = { parentId };

    const totalCount = await this.model.countDocuments(replyQuery);

    const replies = await this.model
      .find(replyQuery)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username profilePicture")
      .exec();

    const fetchedReplyIds = replies.map((reply) => reply._id);

    if (fetchedReplyIds.length === 0) {
      return { comments: [], totalCount: totalCount };
    }

    const grandchildren = await this.model
      .find({ parentId: { $in: fetchedReplyIds } })
      .sort({ createdAt: 1 })
      .populate("userId", "username profilePicture")
      .exec();

    const allCommentsInThreadFragment = [...replies, ...grandchildren].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return { comments: allCommentsInThreadFragment, totalCount: totalCount };
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
}

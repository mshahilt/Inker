import { IVoteRepository } from "../interface/IVoteRepository";
import Vote, { IVote } from "../../models/implementation/vote.model";
import { BaseRepository } from "../base.repository";
import { Types } from "mongoose";

export class VoteRepository extends BaseRepository<IVote> implements IVoteRepository {
  constructor() {
    super(Vote);
  }

  async createVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote> {
    try {
      return await this.create({
        userId: new Types.ObjectId(userId),
        blogId: new Types.ObjectId(blogId),
        voteType,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error creating vote");
    }
  }  

  async findVotesByBlog(blogId: string): Promise<IVote[]> {
    try {
      return await this.find({ blogId: new Types.ObjectId(blogId) });
    } catch (error) {
      console.error(error);
      throw new Error("Error finding votes for blog");
    }
  }

  async findVoteByUserAndBlog(userId:  Types.ObjectId, blogId:  Types.ObjectId): Promise<IVote | null> {
    try {
      return await this.findOne({ userId, blogId });
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user's vote for blog");
    }
  }

  async updateVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote | null> {
    try {
      return await this.model.findOneAndUpdate(
        { userId: new Types.ObjectId(userId), blogId: new Types.ObjectId(blogId) },
        { $set: { voteType } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error updating vote");
    }
  }

  

  async deleteVote(userId: string, blogId: string): Promise<void> {
    try {
      await this.deleteOne({ userId: new Types.ObjectId(userId), blogId: new Types.ObjectId(blogId) });
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting vote");
    }
  }
}

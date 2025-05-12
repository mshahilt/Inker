import { IVote } from "@/models/implementation/vote.model";
import { Types } from "mongoose";

export interface IVoteRepository {
  createVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote>;

  findVotesByBlog(blogId: string): Promise<IVote[]>;

  findVoteByUserAndBlog(userId:  Types.ObjectId, blogId:  Types.ObjectId): Promise<IVote | null>;

  updateVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote | null>;

  deleteVote(userId: string, blogId: string): Promise<void>;
  

//   countVotesByBlog(blogId: string): Promise<number>;
}
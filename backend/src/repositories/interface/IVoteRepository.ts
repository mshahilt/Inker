import { IVote } from "@/models/implementation/vote.model";

export interface IVoteRepository {
  createVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote>;

  findVotesByBlog(blogId: string): Promise<IVote[]>;

  findVoteByUserAndBlog(userId: string, blogId: string): Promise<IVote | null>;

  updateVote(userId: string, blogId: string, voteType: "upvote" | "downvote"): Promise<IVote | null>;

  deleteVote(userId: string, blogId: string): Promise<void>;
  

//   countVotesByBlog(blogId: string): Promise<number>;
}
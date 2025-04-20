import { IVoteService } from "@/services/interface/IVoteService";
import { createHttpError } from "@/utils";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IVoteRepository } from "@/repositories/interface/IVoteRepository";
import { IBlogRepository } from "@/repositories/interface/IBlogRepository";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { Types } from "mongoose";
import { IBlogModel } from "@/models/implementation/blog.model";

export class VoteService implements IVoteService {
  private blogRepository: IBlogRepository;

  constructor(
    private readonly _voteRepository: IVoteRepository,
    blogRepository: BlogRepository
  ) {
    this.blogRepository = blogRepository;
  }

  async updateUpVote(userId: string, blogId: string): Promise<void> {
    const targetBlog = await this.blogRepository.findBlogById(new Types.ObjectId(blogId));
    if (!targetBlog) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.BLOG_NOT_FOUND);
    }
  
    const authorId = targetBlog.authorId;
    const existingVote = await this._voteRepository.findVoteByUserAndBlog(userId, blogId);
  
    if (!existingVote) {
      await this._voteRepository.createVote(userId, blogId, "upvote");
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { upVotes: 1 }as Partial<IBlogModel>,
      });
      return;
    }
  
    if (existingVote.voteType === "upvote") {
      await this._voteRepository.deleteVote(userId, blogId);
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { upVotes: -1 }as Partial<IBlogModel>,
      });
    } else if (existingVote.voteType === "downvote") {
      await this._voteRepository.updateVote(userId, blogId, "upvote");
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { upVotes: 1, downVotes: -1 }as Partial<IBlogModel>,
      });
    }
  }
  
  async updateDownVote(userId: string, blogId: string): Promise<void> {
    const targetBlog = await this.blogRepository.findBlogById(new Types.ObjectId(blogId));
    if (!targetBlog) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.BLOG_NOT_FOUND);
    }
  
    const authorId = targetBlog.authorId;
    const existingVote = await this._voteRepository.findVoteByUserAndBlog(userId, blogId);
  
    if (!existingVote) {
      await this._voteRepository.createVote(userId, blogId, "downvote");
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { downVotes: 1 }as Partial<IBlogModel>,
      });
      return;
    }
  
    if (existingVote.voteType === "downvote") {
      await this._voteRepository.deleteVote(userId, blogId);
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { downVotes: -1 }as Partial<IBlogModel>,
      });
    } else if (existingVote.voteType === "upvote") {
      await this._voteRepository.updateVote(userId, blogId, "downvote");
      await this.blogRepository.updateBlogVote(new Types.ObjectId(blogId), {
        $inc: { downVotes: 1, upVotes: -1 }as Partial<IBlogModel>,
      });
    }
  }
  
}
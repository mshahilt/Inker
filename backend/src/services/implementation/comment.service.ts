import { Types } from "mongoose";
import { createHttpError } from "@/utils";
import { HttpResponse, HttpStatus } from "@/constants";
import { ICommentModel } from "@/models/implementation/comment.model";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { ICommentRepository } from "@/repositories/interface/ICommentRepository";
import {
  ICommentService,
  RepliesServiceResponse,
} from "@/services/interface/ICommentService";

export class CommentService implements ICommentService {
  private commentRepository: ICommentRepository;
  private userRepository: IUserRepository;

  constructor(
    commentRepository: ICommentRepository,
    userRepository: IUserRepository
  ) {
    this.commentRepository = commentRepository;
    this.userRepository = userRepository;
  }

  async createComment(commentData: {
    blogId: string;
    userId: string;
    content: string;
    parentId?: string;
  }): Promise<ICommentModel> {
    const { blogId, userId, content, parentId } = commentData;

    if (!Types.ObjectId.isValid(blogId)) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        HttpResponse.INVALID_BOLG_ID
      );
    }
    if (parentId && !Types.ObjectId.isValid(parentId)) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        HttpResponse.INVALID_PARENT_COMMENT_ID
      );
    }
    const blogObjectId = new Types.ObjectId(blogId);
    const userObjectId = new Types.ObjectId(userId);
    const parentObjectId = parentId ? new Types.ObjectId(parentId) : null;

    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }

    const newCommentData: Partial<ICommentModel> = {
      blogId: blogObjectId,
      userId: userObjectId,
      profilePicture: user.profilePicture,
      username: user.username,
      content: content,
      parentId: parentObjectId,
      likes: [],
    };

    const createdComment =
      await this.commentRepository.createComment(newCommentData);

    return createdComment;
  }

  async toggleLikeComment(
    commentId: string,
    userId: string
  ): Promise<{ likes: number; liked: boolean }> {
    if (!Types.ObjectId.isValid(commentId)) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        HttpResponse.INVALID_COMMENT_ID
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        HttpResponse.INVALID_USER_ID
      );
    }
    const commentObjectId = new Types.ObjectId(commentId);
    const userObjectId = new Types.ObjectId(userId);

    const comment =
      await this.commentRepository.findCommentById(commentObjectId);

    if (!comment) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.COMMENT_NOT_FOUND);
    }

    const userIdString = userObjectId.toString();
    const likeIndex = comment.likes
      .map((id) => id.toString())
      .indexOf(userIdString);
    let liked = false;

    if (likeIndex === -1) {
      comment.likes.push(userObjectId);
      liked = true;
    } else {
      comment.likes.splice(likeIndex, 1);
      liked = false;
    }

    const updatedComment = await this.commentRepository.updateComment(
      commentObjectId,
      { likes: comment.likes }
    );

    if (!updatedComment) {
      throw createHttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpResponse.FAILED_TO_UPDATE_COMMENT_LIKES
      );
    }

    return {
      likes: updatedComment.likes.length,
      liked: liked,
    };
  }

  async getTopLevelComments(
    blogId: string,
    page: number,
    limit: number
  ): Promise<{
    comments: ICommentModel[];
    totalPages: number;
    totalCount: number;
  }> {
    if (!Types.ObjectId.isValid(blogId)) {
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.INVALID_BOLG_ID);
    }
    const blogObjectId = new Types.ObjectId(blogId);
    const skip = (page - 1) * limit;

    const { comments, totalCount } =
      await this.commentRepository.findTopLevelByBlogId(
        blogObjectId,
        skip,
        limit
      );
    const totalPages = Math.ceil(totalCount / limit);

    return { comments, totalPages, totalCount };
  }

  async getReplies(
    parentId: string,
    page: number,
    limit: number
  ): Promise<RepliesServiceResponse> {
    if (!Types.ObjectId.isValid(parentId)) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        HttpResponse.INVALID_PARENT_COMMENT_ID
      );
    }
    const parentObjectId = new Types.ObjectId(parentId);
    const skip = (page - 1) * limit;

    const { replies: fetchedReplies, totalCount } =
      await this.commentRepository.findRepliesByParentId(
        parentObjectId,
        skip,
        limit
      );

    const totalPages = Math.ceil(totalCount / limit);

    return { comments: fetchedReplies, totalPages, totalCount };
  }
}

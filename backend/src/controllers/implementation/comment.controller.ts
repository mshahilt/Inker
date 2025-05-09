import { createHttpError } from "@/utils";
import { HttpStatus } from "@/constants";
import { Request, Response, NextFunction } from "express";
import { ICommentService } from "@/services/interface/ICommentService";
import { ICommentController } from "@/controllers/interface/ICommentController";
import { CreateCommentRequestType, paginationQuerySchema } from "@/schema/comment.schema";

export class CommentController implements ICommentController {
  private commentService: ICommentService;

  constructor(commentService: ICommentService) {
    this.commentService = commentService;
  }

  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const commentData = req.body as CreateCommentRequestType;

      const { id: userId } = JSON.parse( req.headers["x-user-payload"] as string );

      const createdComment = await this.commentService.createComment({
        blogId: commentData.blogId,
        userId: userId as string,
        content: commentData.content,
        parentId: commentData.parentId,
      });

      res.status(HttpStatus.CREATED).json(createdComment);
    } catch (error) {
      next(error);
    }
  }

  async getTopLevelComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const blogId = req.params.blogId as string;

        const result = paginationQuerySchema.safeParse(req.query);
        if (!result.success) {
            throw createHttpError(HttpStatus.BAD_REQUEST, result.error.errors.map(e => e.message).join(', '));
        }
        const { page, limit } = result.data;

        const commentsData = await this.commentService.getTopLevelComments(blogId, page, limit);

        res.status(HttpStatus.OK).json(commentsData); 
    } catch (error) {
        next(error);
    }
  }

 async getReplies(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          const parentId = req.params.commentId as string; 

          const result = paginationQuerySchema.safeParse(req.query);
          if (!result.success) {
              throw createHttpError(HttpStatus.BAD_REQUEST, result.error.errors.map(e => e.message).join(', '));
          }
          const { page, limit } = result.data;

          const repliesData = await this.commentService.getReplies(parentId, page, limit);

          res.status(HttpStatus.OK).json(repliesData); 
      } catch (error) {
          next(error);
      }
  }


  async toggleLikeComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const commentId = req.params.commentId as string;

      const { id: userId } = JSON.parse(
        req.headers["x-user-payload"] as string
      );

      const result = await this.commentService.toggleLikeComment(
        commentId,
        userId as string
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

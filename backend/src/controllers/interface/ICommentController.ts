import { Request, Response, NextFunction } from 'express';

export interface ICommentController {
  createComment(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTopLevelComments(req: Request, res: Response, next: NextFunction): Promise<void> 
  getReplies(req: Request, res: Response, next: NextFunction): Promise<void>
  toggleLikeComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
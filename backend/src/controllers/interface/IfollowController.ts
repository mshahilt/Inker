import { NextFunction, Request, Response } from "express";

export interface IFollowController {
  toggleFollow(req: Request, res: Response , next : NextFunction): Promise<void>;
  checkFollowStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
import { NextFunction, Request, Response } from "express";
import { IFollowService } from "@/services/interface/IFollowService";
import { Types } from "mongoose";
import { HttpStatus } from "@/constants";
import { IFollowController } from "@/controllers/interface/IfollowController";

export class FollowController implements IFollowController {
  constructor(private followService: IFollowService) {}

  async toggleFollow(req: Request, res: Response, next: NextFunction) {
    const { id: followerId } = JSON.parse(req.headers["x-user-payload"] as string);
    const { userId: followingId } = req.params;

    try {
      const RESPONSE_MESSAGE = await this.followService.toggleFollow(followerId, followingId);
      res.status(HttpStatus.OK).json({ message: RESPONSE_MESSAGE });
    } catch (error) {
      next(error);
    }
  }
    async checkFollowStatus(req: Request, res: Response, next: NextFunction) {
    const { id: followerId } = JSON.parse(req.headers["x-user-payload"] as string);
    const { userId: followingId } = req.params;
    try {
        const followingObjectId = new Types.ObjectId(followingId);

        const existingFollow = await this.followService.findFollow(followerId, followingObjectId);

        res.status(HttpStatus.OK).json({ isFollowing: !!existingFollow });
    } catch (error) {
        next(error);
    }
    }
}

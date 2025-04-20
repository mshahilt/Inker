import { Types } from "mongoose";
import { IFollowService } from "../interface/IFollowService";
import { IFollowRepository } from "@/repositories/interface/IFollow.Repository";
import { IFollow } from "shared/types";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { HttpResponse } from "@/constants";

export class FollowService implements IFollowService {
  constructor(
    private followRepository: IFollowRepository,
    private userRepository: IUserRepository
  ) {}

  async findFollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<IFollow | null> {
    return this.followRepository.findFollow(followerId, followingId);
  }

  async toggleFollow(
    followerId: string,
    followingId: string
  ): Promise<string> {
    const followerObjectId = new Types.ObjectId(followerId);
    const followingObjectId = new Types.ObjectId(followingId);

    const existingFollow = await this.followRepository.findFollow(
      followerObjectId,
      followingObjectId
    );

    if (existingFollow) {
        this.unfollow(followerObjectId, followingObjectId)
        return HttpResponse.UNFOLLOWED_SUCCESSFULL
    } else {
        this.follow(followerObjectId, followingObjectId) 
        return HttpResponse.FOLLOWED_SUCCESSFULL
    }
  }

  async unfollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<void> {
    await Promise.all([
      this.followRepository.deleteFollow(followerId, followingId),
      this.userRepository.decrementFollow(followerId, followingId),
    ]);
  }
  
  async follow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<void> {
    await Promise.all([
      this.followRepository.createFollow(followerId, followingId),
      this.userRepository.incrementFollow(followerId, followingId),
    ]);
  }
}

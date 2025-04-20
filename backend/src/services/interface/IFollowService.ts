
import { Types } from "mongoose";
import { IFollow } from "shared/types";

export interface IFollowService{
    toggleFollow(followerId: string, followingId: string):  Promise<string>
    findFollow(followerId: Types.ObjectId, followingId: Types.ObjectId): Promise<IFollow | null>
    unfollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
    ): Promise<void>
    follow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<void> 
}
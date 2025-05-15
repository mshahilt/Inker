
import { Types } from "mongoose";
import { IFollow, IUser } from "shared/types";


export interface IFollowService {
  toggleFollow(followerId: string, followingId: string): Promise<string>
  findFollow(followerId: Types.ObjectId, followingId: Types.ObjectId): Promise<IFollow | null>
  unfollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<void>
  follow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<void>
  getFollowData(userId: string, type: "followers" | "followings"): Promise<Partial<IUser>[]>
}
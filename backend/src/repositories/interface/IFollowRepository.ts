import { IFollow } from "shared/types";
import { Types } from "mongoose";

export interface IFollowRepository{
    findFollow(followerId: Types.ObjectId, followingId: Types.ObjectId) : Promise<IFollow | null>
    createFollow(followerId: Types.ObjectId, followingId: Types.ObjectId) : Promise<IFollow | null>
    deleteFollow(followerId: Types.ObjectId, followingId: Types.ObjectId) : Promise<IFollow | null>
}
import { IFollowRepository } from "@/repositories/interface/IFollowRepository";
import Follow, { IFollowDocument } from "@/models/implementation/follow.model";
import { BaseRepository } from "../base.repository";
import { Types } from "mongoose";

export class FollowRepository
  extends BaseRepository<IFollowDocument>
  implements IFollowRepository
{
  constructor() {
    super(Follow);
  }
  
  async findFollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<IFollowDocument | null> {
    return this.model.findOne({ followerId, followingId });
  }

  async createFollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<IFollowDocument | null> {
    const follow = new this.model({ followerId, followingId });
    return follow.save();
  }

  async deleteFollow(
    followerId: Types.ObjectId,
    followingId: Types.ObjectId
  ): Promise<IFollowDocument | null> {
    return this.model.findOneAndDelete({ followerId, followingId });
  }
}
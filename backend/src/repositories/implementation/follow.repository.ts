import { IFollowRepository } from "@/repositories/interface/IFollowRepository";
import Follow, { IFollowDocument } from "@/models/implementation/follow.model";
import { BaseRepository } from "../base.repository";
import { Types } from "mongoose";
import { IUser } from "shared/types";

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
  
  async findFollowers(
    userId: Types.ObjectId
  ): Promise<Partial<IUser>[]> {
    const followers = await this.model.aggregate([
      { $match: { followingId: userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'followerId',
          foreignField: '_id',
          as: 'followerDetails'
        }
      },
      { $unwind: '$followerDetails' },
      {
        $project: {
          _id: '$followerDetails._id',
          name: '$followerDetails.name',
          username: '$followerDetails.username',
          profilePicture: '$followerDetails.profilePicture'
        }
      }
    ]);

    return followers;
  }

  async findFollowings(
    userId: Types.ObjectId
  ): Promise<Partial<IUser>[]> {
    const followings = await this.model.aggregate([
      { $match: { followerId: userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'followingId',
          foreignField: '_id',
          as: 'followingDetails'
        }
      },
      { $unwind: '$followingDetails' },
      {
        $project: {
          _id: '$followingDetails._id',
          name: '$followingDetails.name',
          username: '$followingDetails.username',
          profilePicture: '$followingDetails.profilePicture'
        }
      }
    ]);

    return followings;
  }
}
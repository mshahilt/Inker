// models/implementation/follow.model.ts
import { model, Schema, Document } from "mongoose";
import { IFollow } from "shared/types";

export interface IFollowDocument extends IFollow, Document {}

const followSchema = new Schema<IFollowDocument>(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Follow = model<IFollowDocument>("Follow", followSchema);
export default Follow;

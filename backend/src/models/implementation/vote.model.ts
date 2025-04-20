import { model, Schema, Document, Types } from "mongoose";

export interface IVote extends Document {
  blogId: Types.ObjectId; 
  userId: Types.ObjectId; 
  voteType: "upvote" | "downvote"; 
};

const voteSchema = new Schema<IVote>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = model<IVote>("Vote", voteSchema);
export default Vote;

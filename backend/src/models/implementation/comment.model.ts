import { IComment } from "shared/types";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICommentModel
  extends Document,
    Omit<IComment, "_id" | "blogId" | "userId" | "parentId" | "likes"> {
  blogId: Types.ObjectId;
  userId: Types.ObjectId;
  parentId: Types.ObjectId | null;
  likes: Types.ObjectId[];
}

const commentSchema: Schema<ICommentModel> = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    profilePicture: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null, // Null for top-level comments
      index: true, // Index for efficient lookup by parent
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<ICommentModel>("Comment", commentSchema);

export default Comment;

import { model, Schema, Document, Types } from "mongoose";
import { IBlog } from "shared/types";

export interface IBlogModel extends Document, Omit<IBlog, "_id" | "authorId"> {
  authorId: Types.ObjectId;
};
const blogSchema = new Schema<IBlogModel>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorProfilePicture: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Blog = model<IBlogModel>("Blog", blogSchema);
export default Blog;

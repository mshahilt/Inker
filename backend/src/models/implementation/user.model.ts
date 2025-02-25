import { model, Schema, Document } from "mongoose";
import { IUser } from "shared/types";

export interface IUserModel extends Document, Omit<IUser, "_id"> {}

const userSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["user", "moderator"],
      default: "user",
    },
    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    social_links: [
      {
        type: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    resume: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = model<IUserModel>("User", userSchema);
export default User;

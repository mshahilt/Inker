import { Types } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  status: "active" | "blocked";
  role: "user" | "moderator";
  bio: string;
  followers: number;
  followings: number;
  profilePicture?: string;
  socialLinks: { platform: string; url: string }[];
  resume?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlog {
  _id: string;
  authorId: string;
  authorName: string;
  authorProfilePicture: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  upVotes: number;
  downVotes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBlogRequestDTO {
  title: string;
  thumbnail: string;
  content: string;
  authorName: string;
  authorId: string;
}

// Interface for a follow document
export interface IFollow extends Document {
  followerId: Types.ObjectId;   // user who follows
  followingId: Types.ObjectId;  // user being followed
  createdAt?: Date;
}

export interface IComment {
  _id: string;
  blogId: string;
  userId: string;
  profilePicture: string;
  username: string;
  content: string;
  parentId: string | null; // null for top-level comment
  likes: string[];
  totalDescendantCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

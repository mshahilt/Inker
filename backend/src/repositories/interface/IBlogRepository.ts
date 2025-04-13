import { IBlogModel } from "@/models/implementation/blog.model";
import { Types } from "mongoose";

export interface IBlogRepository {
  createBlog(blogData: Partial<IBlogModel>): Promise<IBlogModel>;
  findBlogById(blogId: Types.ObjectId): Promise<IBlogModel | null>;
  findBlogByAuthorId(authorId: Types.ObjectId, skip: number, limit: number): Promise<{blogs: IBlogModel[], totalCount: number}>;
  findAllBlogs(skip: number, limit: number): Promise<{blogs: IBlogModel[], totalCount: number}>;
  updateBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    updateData: Partial<IBlogModel>
  ): Promise<IBlogModel | null>;
  deleteBlog(blogId: Types.ObjectId, authorId: Types.ObjectId): Promise<IBlogModel | null>;
  updateUsername(authorId: string, username: string): Promise<void>;
  updateProfilePicture(authorId: string, profileUrl: string): Promise<void>;
}

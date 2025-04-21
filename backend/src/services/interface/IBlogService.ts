// import { IBlogModel } from "@/models/implementation/blog.model";
// import { ICreateBlogRequestDTO } from "shared/types";

// export interface IBlogService {
//   create(data: ICreateBlogRequestDTO): Promise<IBlogModel>;
//   createBlog(blogData: any): Promise<any>;
//   getBlogById(blogId: string): Promise<any>;
//   getAllBlogs(): Promise<any>;
//   updateBlog(blogId: string, updateData: any): Promise<any>;
//   deleteBlog(blogId: string): Promise<any>;
// }

import { Types } from "mongoose";
import { IBlogModel } from "@/models/implementation/blog.model";

export interface IBlogService {
  createBlog(blogData: Partial<IBlogModel>): Promise<IBlogModel>;
  getBlogById(blogId:  Types.ObjectId, userId:  Types.ObjectId): Promise<BlogWithVoteStatus>;
  findBlogByAuthorId(authorId: Types.ObjectId, page: number): Promise<{blogs: IBlogModel[], totalPages: number}>;
  findBlogByAuthorName( userId: Types.ObjectId, authorName: string, page: number): Promise<{blogs: IBlogModel[], totalPages: number}>;
  getAllBlogs(userId: Types.ObjectId, page: number): Promise<{blogs: BlogWithVoteStatus[], totalPages: number}>;
  updateBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    updateData: Partial<IBlogModel>
  ): Promise<IBlogModel>;
  deleteBlog(blogId: Types.ObjectId, authorId: Types.ObjectId): Promise<IBlogModel>;
  uploadImage(file: Express.Multer.File): Promise<string>
}

export type BlogWithVoteStatus = IBlogModel & {
  hasUpVoted: boolean;
  hasDownVoted: boolean;
};
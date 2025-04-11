import { BaseRepository } from "../base.repository";
import { IBlogRepository } from "../interface/IBlogRepository";
import Blog, { IBlogModel } from "@/models/implementation/blog.model";
import { Types } from "mongoose";

export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepository
{
  constructor() {
    super(Blog);
  }

  async createBlog(blogData: Partial<IBlogModel>): Promise<IBlogModel> {
    const newBlog = await this.create(blogData);
    return newBlog;
  }

  async findBlogById(blogId: Types.ObjectId): Promise<IBlogModel | null> {
    return this.findById(blogId);
  }

  async findBlogByAuthorId( authorId: Types.ObjectId): Promise<IBlogModel[] | null> {
    return this.find({authorId});
  }

  async findAllBlogs(): Promise<IBlogModel[]> {
    return await Blog.find().sort({ createdAt: -1 })
  }

  async updateBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    updateData: Partial<IBlogModel>
  ): Promise<IBlogModel | null> {
    await this.updateOne({_id: blogId, authorId}, updateData);
    return await this.findOne({_id: blogId, authorId})
  }

  async deleteBlog(blogId: Types.ObjectId, authorId: Types.ObjectId): Promise<IBlogModel | null> {
    const blog = await this.findOne({_id: blogId, authorId})
    await this.deleteOne({_id: blogId, authorId});
    return blog
  }

}

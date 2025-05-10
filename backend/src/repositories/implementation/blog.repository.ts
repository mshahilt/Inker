import { BaseRepository } from "../base.repository";
import { IBlogRepository } from "../interface/IBlogRepository";
import Blog, { IBlogModel } from "@/models/implementation/blog.model";
import { Types, UpdateQuery } from "mongoose";

export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepository {
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

  async findBlogByAuthorId(authorId: Types.ObjectId, skip: number, limit: number): Promise<{ blogs: IBlogModel[], totalCount: number }> {
    const [data, totalCount] = await Promise.all([
      Blog.find({ authorId, isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments({ authorId, isArchived: false })
    ])
    return { blogs: data, totalCount }
  }

  async findBlogByAuthorName(authorName: string, skip: number, limit: number): Promise<{ blogs: IBlogModel[], totalCount: number }> {
    const [data, totalCount] = await Promise.all([
      Blog.find({ authorName, isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments({ authorName, isArchived: false })
    ])
    return { blogs: data, totalCount }
  }

  async findArchivedBlogs(authorId: Types.ObjectId, skip: number, limit: number): Promise<{ archivedBlogs: IBlogModel[], totalCount: number }> {
    const [data, totalCount] = await Promise.all([
      Blog.find({ authorId, isArchived: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments({ authorId, isArchived: true })
    ])
    return { archivedBlogs: data, totalCount }
  }

  async findAllBlogs(skip: number, limit: number): Promise<{ blogs: IBlogModel[], totalCount: number }> {
    const [data, totalCount] = await Promise.all([
      Blog.find({ isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments({ isArchived: false })
    ])
    return { blogs: data, totalCount }
  }

  async updateBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    updateData: Partial<IBlogModel>
  ): Promise<IBlogModel | null> {
    await this.updateOne({ _id: blogId, authorId }, updateData);
    return await this.findOne({ _id: blogId, authorId })
  }

  async archiveBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    action: boolean
  ): Promise<IBlogModel | null> {
    await this.updateOne({ _id: blogId, authorId }, { isArchived: action });
    return await this.findOne({ _id: blogId, authorId })
  }

  async updateBlogVote(
    blogId: Types.ObjectId,
    updateData: UpdateQuery<IBlogModel>
  ): Promise<IBlogModel | null> {
    await this.updateOne({ _id: blogId }, updateData);
    return await this.findOne({ _id: blogId });
  }

  async deleteBlog(blogId: Types.ObjectId, authorId: Types.ObjectId): Promise<IBlogModel | null> {
    const blog = await this.findOne({ _id: blogId, authorId })
    await this.deleteOne({ _id: blogId, authorId });
    return blog
  }

  async updateUsername(authorId: string, username: string): Promise<void> {
    await Blog.updateMany({ authorId }, { authorName: username })
  }

  async updateProfilePicture(authorId: string, profileUrl: string): Promise<void> {
    await Blog.updateMany({ authorId }, { authorProfilePicture: profileUrl })
  }

}

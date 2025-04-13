import { HttpResponse, HttpStatus } from "@/constants";
import { IBlogService } from "../interface/IBlogService";
import { IBlogModel } from "@/models/implementation/blog.model";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { createHttpError, uploadToCloudinary } from "@/utils";
import { Types } from "mongoose";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IBlogRepository } from "@/repositories/interface/IBlogRepository";
import { v4 as uuidv4 } from "uuid";

export class BlogService implements IBlogService {
  private blogRepository: IBlogRepository;
  private userRepository: IUserRepository;

  constructor(blogRepository: BlogRepository, userRepository: IUserRepository) {
    this.blogRepository = blogRepository;
    this.userRepository = userRepository;
  }

  async createBlog(blogData: Partial<IBlogModel>): Promise<IBlogModel> {
    const authorId = blogData.authorId;
    if (!authorId) {
      throw createHttpError(
        HttpStatus.NOT_FOUND,
        HttpResponse.REQUIRED_AUTHOR_ID
      );
    }

    const author = await this.userRepository.findUserById(authorId.toString());
    if (!author) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    const authorName = author.username;
    const authorProfilePicture = author.profilePicture
    return this.blogRepository.createBlog({ ...blogData, authorName, authorProfilePicture });
  }

  async getBlogById(blogId: Types.ObjectId): Promise<IBlogModel> {
    const blog = await this.blogRepository.findBlogById(blogId);
    if (!blog) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.BLOG_NOT_FOUND);
    }
    return blog;
  }

  async findBlogByAuthorId(authorId: Types.ObjectId, page: number): Promise<{blogs: IBlogModel[], totalPages: number}> {
    const docsPerPage = 12
    const skip = (page - 1) * docsPerPage
    const { blogs, totalCount } = await this.blogRepository.findBlogByAuthorId(authorId, skip, docsPerPage);
    return { blogs, totalPages: Math.ceil(totalCount / docsPerPage) }
  }

  async getAllBlogs(page: number): Promise<{blogs: IBlogModel[], totalPages: number}> {
    const docsPerPage = 12
    const skip = (page - 1) * docsPerPage
    const { blogs, totalCount } = await this.blogRepository.findAllBlogs(skip, docsPerPage);
    return { blogs, totalPages: Math.ceil(totalCount / docsPerPage) }
  }

  async updateBlog(
    blogId: Types.ObjectId,
    authorId: Types.ObjectId,
    updateData: Partial<IBlogModel>
  ): Promise<IBlogModel> {
    const updatedBlog = await this.blogRepository.updateBlog(
      blogId,
      authorId,
      updateData
    );
    
    if (!updatedBlog) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.BLOG_NOT_FOUND);
    }
    return updatedBlog;
  }

  async deleteBlog(blogId: Types.ObjectId, authorId: Types.ObjectId): Promise<IBlogModel> {
    const deletedBlog = await this.blogRepository.deleteBlog(blogId, authorId);
    if (!deletedBlog) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.BLOG_NOT_FOUND);
    }
    return deletedBlog;
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {    
    const uniqueId = uuidv4();
    const uploadResult = await uploadToCloudinary(file, "uploads", uniqueId);
    return uploadResult.secure_url
  }

}

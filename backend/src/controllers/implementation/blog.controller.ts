import { NextFunction, Request, Response } from "express";
import { IBlogController } from "../interface/IBlogController";
import { IBlogService } from "@/services/interface/IBlogService";
import { Types } from "mongoose";
import { HttpStatus } from "@/constants";
import { CreateBlogRequestType } from "@/schema/create-blog.schema";
import { EditBlogRequestType } from "@/schema";

export class BlogController implements IBlogController {
  constructor(private blogService: IBlogService) {}

  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogData = req.body as CreateBlogRequestType;
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const createdBlog = await this.blogService.createBlog({
        ...blogData,
        authorId: id,
      });
      res.status(HttpStatus.CREATED).json(createdBlog);
    } catch (error) {
      next(error);
    }
  }

  async getBlogById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogId = new Types.ObjectId(req.params.id);
      const blog = await this.blogService.getBlogById(blogId);
      res.status(HttpStatus.OK).json(blog);
    } catch (error) {
      next(error);
    }
  }

  async getBlogByAuthorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = new Types.ObjectId(req.params.id);
      const { page } = req.query
      let pageNo = 1
      if(!isNaN(Number(page))) {
        pageNo = Number(page)
      }
      const data = await this.blogService.findBlogByAuthorId(userId, pageNo);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page } = req.query
      let pageNo = 1
      if (!isNaN(Number(page))) {
        pageNo = Number(page)
      }
      const data = await this.blogService.getAllBlogs(pageNo);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogId = new Types.ObjectId(req.params.id);
      const updateData = req.body as EditBlogRequestType;
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const userId = new Types.ObjectId(String(id))
      const updatedBlog = await this.blogService.updateBlog(blogId, userId, updateData);

      res.status(HttpStatus.OK).json(updatedBlog);
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogId = new Types.ObjectId(req.params.id);
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const userId = new Types.ObjectId(String(id))

      const deletedBlog = await this.blogService.deleteBlog(blogId, userId);

      res.status(HttpStatus.OK).json(deletedBlog);
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }
      const signedUrl = await this.blogService.uploadImage(req.file);
      res.status(HttpStatus.OK).json({ url: signedUrl });
    } catch (error) {
      next(error);
    }
  }

}
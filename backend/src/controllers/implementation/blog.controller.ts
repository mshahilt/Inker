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
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const blogId = new Types.ObjectId(req.params.id);
      const userId = new Types.ObjectId(id as string);
      const blog = await this.blogService.getBlogById( blogId, userId );
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

  async getBlogByAuthorName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const userId = new Types.ObjectId(id as string);
      const authorName = req.params.authorName;
      const { page } = req.query
      let pageNo = 1
      if (!isNaN(Number(page))) {
        pageNo = Number(page)
      }
      const data = await this.blogService.findBlogByAuthorName(userId, authorName, pageNo);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getArchivedBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const userId = new Types.ObjectId(id as string);
      const { page } = req.query
      let pageNo = 1
      if (!isNaN(Number(page))) {
        pageNo = Number(page)
      }
      const data = await this.blogService.findArchivedBlogs(userId, pageNo);
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
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const userId = new Types.ObjectId(id as string);
      const { page } = req.query
      let pageNo = 1
      if (!isNaN(Number(page))) {
        pageNo = Number(page)
      }
      const data = await this.blogService.getAllBlogs(userId, pageNo);
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

  async archiveBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogId = new Types.ObjectId(req.params.id);
      const { id } = JSON.parse(req.headers["x-user-payload"] as string);
      const { action } = req.body as { action: boolean };
      const userId = new Types.ObjectId(String(id))

      const archivedBlog = await this.blogService.archiveBlog(blogId, userId, action);

      res.status(HttpStatus.OK).json(archivedBlog);
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
        if (req.fileValidationError) {
          res.status(HttpStatus.BAD_REQUEST).json({ error: req.fileValidationError })
        } else {
          throw new Error("No file uploaded");
        }
      }
      const signedUrl = await this.blogService.uploadImage(req.file as Express.Multer.File);
      res.status(HttpStatus.OK).json({ url: signedUrl });
    } catch (error) {
      next(error);
    }
  }

}
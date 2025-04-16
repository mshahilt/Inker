import { Router } from "express";
import { validate } from "@/middlewares/validate.middleware";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { BlogService } from "@/services/implementation/blog.service";
import { BlogController } from "@/controllers/implementation/blog.controller";
import { UserRepository } from "@/repositories/implementation/user.repository";
import { createBlogSchema, editBlogSchema } from "@/schema";
import verifyToken from "@/middlewares/verify-token.middleware";
import { uploadMiddleware } from "@/middlewares";

const router = Router();

const blogRepository = new BlogRepository();
const userRepository = new UserRepository();
const blogService = new BlogService(blogRepository, userRepository);
const blogController = new BlogController(blogService);

router.post(
  "/",
  validate(createBlogSchema),
  verifyToken("user"),
  blogController.createBlog.bind(blogController)
);

router.get(
  "/",
  verifyToken("user"),
  blogController.getAllBlogs.bind(blogController)
);

router.get(
  "/:id",
  verifyToken("user"),
  blogController.getBlogById.bind(blogController)
);

router.get(
  "/user/:id",
  verifyToken("user"),
  blogController.getBlogByAuthorId.bind(blogController)
);

router.put(
  "/:id",
  validate(editBlogSchema),
  verifyToken("user"),
  blogController.updateBlog.bind(blogController)
);

router.delete(
  "/:id",
  verifyToken("user"),
  blogController.deleteBlog.bind(blogController)
);

router.post(
  '/upload-image',
  verifyToken("user"),
  uploadMiddleware('image'),
  blogController.uploadImage.bind(blogController)
)

export default router;
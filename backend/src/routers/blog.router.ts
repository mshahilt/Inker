import { Router } from "express";
import { validate } from "@/middlewares/validate.middleware";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { BlogService } from "@/services/implementation/blog.service";
import { BlogController } from "@/controllers/implementation/blog.controller";
import { UserRepository } from "@/repositories/implementation/user.repository";
import { createBlogSchema, editBlogSchema } from "@/schema";

const router = Router();

const blogRepository = new BlogRepository();
const userRepository = new UserRepository();
const blogService = new BlogService(blogRepository, userRepository);
const blogController = new BlogController(blogService);

router.post(
  "/",
  validate(createBlogSchema),
  blogController.createBlog.bind(blogController)
);

router.put(
  "/:id",
  validate(editBlogSchema),
  blogController.updateBlog.bind(blogController)
);

export default router;

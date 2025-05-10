import { Router } from "express";
import { validate } from "@/middlewares/validate.middleware";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { BlogService } from "@/services/implementation/blog.service";
import { BlogController } from "@/controllers/implementation/blog.controller";
import { UserRepository } from "@/repositories/implementation/user.repository";
import { createBlogSchema, editBlogSchema } from "@/schema";
import verifyToken from "@/middlewares/verify-token.middleware";
import { uploadMiddleware } from "@/middlewares";
import { VoteRepository } from "@/repositories/implementation/vote.repository";

const router = Router();

const blogRepository = new BlogRepository();
const userRepository = new UserRepository();
const voteRepository = new VoteRepository()
const blogService = new BlogService(blogRepository, userRepository, voteRepository);
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
  "/user/archived",
  verifyToken("user"),
  blogController.getArchivedBlogs.bind(blogController)
);

router.get(
  "/user/:authorName",
  verifyToken("user"),
  blogController.getBlogByAuthorName.bind(blogController)
);

router.get(
  "/:id",
  verifyToken("user"),
  blogController.getBlogById.bind(blogController)
);

router.put(
  "/:id",
  validate(editBlogSchema),
  verifyToken("user"),
  blogController.updateBlog.bind(blogController)
);

router.patch(
  "/:id/archive",
  verifyToken("user"),
  blogController.archiveBlog.bind(blogController)
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
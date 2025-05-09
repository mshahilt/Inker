import { Router } from "express";
import { UserRepository } from "../repositories/implementation/user.repository";
import verifyToken from "@/middlewares/verify-token.middleware";
import { ProfileService } from "@/services/implementation/profile.service";
import { ProfileController } from "@/controllers/implementation/profile.controller";
import { validate } from "@/middlewares/validate.middleware";
import { editUsernameSchema, updateProfileSchema } from "@/schema";
import { uploadMiddleware } from "@/middlewares";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { CommentRepository } from "@/repositories/implementation/comment.repository";


const router = Router();

const userRepository = new UserRepository();
const blogRepository = new BlogRepository();
const commentRepository = new CommentRepository()
const profileService = new ProfileService(userRepository, blogRepository,commentRepository);
const profileController = new ProfileController(profileService);

router.get(
  "/:username",
  profileController.getProfile.bind(profileController)
);

router.patch(
  "/change-username",
  validate(editUsernameSchema),
  verifyToken('user'),
  profileController.editUsername.bind(profileController)
)

router.put(
  "/update-profile",
  validate(updateProfileSchema),
  verifyToken('user'),
  profileController.updateProfile.bind(profileController)
);

// router.patch(
//   '/change-email/:userId',
//   verifyToken('user'),
//   profileController.updateEmail.bind(profileController)
// )

router.patch(
  "/change-profile-picture",
  verifyToken("user"),
  uploadMiddleware("profilePicture"),
  profileController.changeProfilePicture.bind(profileController)
)


export default router;

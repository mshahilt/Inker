import { Router } from "express";
import { UserRepository } from "../repositories/implementation/user.repository";
import verifyToken from "@/middlewares/verify-token.middleware";
import { ProfileService } from "@/services/implementation/profile.service";
import { ProfileController } from "@/controllers/implementation/profile.controller";
import validate from "@/middlewares/validate.middleware";
import updateProfileSchema from "@/schema/update-profile.schema";
import editUsernameSchema from "@/schema/username.schema";

const profileRouter = Router();

const userRepository = new UserRepository();
const profileService = new ProfileService(userRepository);
const profileController = new ProfileController(profileService);

profileRouter.get(
  "/:username",
  profileController.getProfile.bind(profileController)
);

profileRouter.patch(
  "/change-username",
  validate(editUsernameSchema),
  verifyToken('user'),
  profileController.editUsername.bind(profileController)
);

profileRouter.patch(
  "/update-profile",
  validate(updateProfileSchema),
  verifyToken('user'),
  profileController.updateProfile.bind(profileController)
);





export default profileRouter;

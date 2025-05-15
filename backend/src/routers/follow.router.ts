import { Router } from "express";
import verifyToken from "@/middlewares/verify-token.middleware";
import { FollowRepository } from "@/repositories/implementation/follow.repository";
import { FollowService } from "@/services/implementation/follow.service";
import { FollowController } from "@/controllers/implementation/follow.controller";
import { UserRepository } from "@/repositories/implementation/user.repository";

const followRouter = Router();

const followRepository = new FollowRepository();
const userRepositry = new UserRepository()
const followService = new FollowService(followRepository , userRepositry);
const followController = new FollowController(followService);

followRouter.post(
  "/:userId", 
  verifyToken("user"),
  followController.toggleFollow.bind(followController)
);
followRouter.get(
  "/status/:userId", 
  verifyToken("user"),
  followController.checkFollowStatus.bind(followController)
);
followRouter.get(
  "/:userId",
  verifyToken("user"),
  followController.getFollowData.bind(followController)
);

export default followRouter;
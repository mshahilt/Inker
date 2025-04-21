import { Router } from "express";
import { VoteRepository } from "../repositories/implementation/vote.repository";
import verifyToken from "@/middlewares/verify-token.middleware";
import { VoteService } from "@/services/implementation/vote.service";
import { VoteController } from "@/controllers/implementation/vote.controller";
import { BlogRepository } from "@/repositories/implementation/blog.repository";
import { voteRateLimiter } from "@/middlewares/ratelimit.middleware"; 

const router = Router();

const voteRepository = new VoteRepository();
const blogRepository = new BlogRepository();
const voteService = new VoteService(voteRepository, blogRepository);
const voteController = new VoteController(voteService);

router.get(
    "/upvote",
    verifyToken("user"),
    voteRateLimiter,
    voteController.upVote.bind(voteController)
);

router.get(
    "/downvote",
    verifyToken("user"),
    voteRateLimiter,
    voteController.downVote.bind(voteController)
);

// router.get(
//   "/blog/:blogId",
//   voteController.getVotesByBlog.bind(voteController)
// );

// router.get(
//   "/user/:userId/blog/:blogId",
//   verifyToken("user"),
//   voteController.getVoteByUserAndBlog.bind(voteController)
// );

// router.patch(
//   "/update",
//   verifyToken("user"),
//   validate(updateVoteSchema),
//   voteController.updateVote.bind(voteController)
// );

// router.delete(
//   "/remove",
//   verifyToken("user"),
//   voteController.deleteVote.bind(voteController)
// );

export default router;

import { Router } from 'express';
import { validate } from '@/middlewares/validate.middleware'; 
import verifyToken from "@/middlewares/verify-token.middleware";
import { createCommentSchema } from '@/schema/comment.schema'; 
import { CommentService } from '@/services/implementation/comment.service'; 
import { UserRepository } from '@/repositories/implementation/user.repository'; 
import { CommentController } from '@/controllers/implementation/comment.controller'; 
import { CommentRepository } from '@/repositories/implementation/comment.repository';


const router = Router();

const commentRepository = new CommentRepository();
const userRepository = new UserRepository(); 
const commentService = new CommentService(commentRepository, userRepository);
const commentController = new CommentController(commentService);

router.post(
  '/',
  validate(createCommentSchema),
  verifyToken("user"), 
  commentController.createComment.bind(commentController)
);

router.get(
  '/blogs/:blogId/top-level',
  commentController.getTopLevelComments.bind(commentController)
);

router.get(
  '/:commentId/replies',
  commentController.getReplies.bind(commentController)
);

router.post(
  '/:commentId/like',
  verifyToken("user"), 
  commentController.toggleLikeComment.bind(commentController)
);


export default router;
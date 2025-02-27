import { UserController } from "@/controllers/implementation/user.controller";
import { Router } from "express";
import { UserRepository } from '../repositories/implementation/user.repository';
import { UserService } from '../services/implementation/user.service';

const userRouter = Router();

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)


userRouter.post("/profile/:id", userController.profile.bind(userController));


export default userRouter;

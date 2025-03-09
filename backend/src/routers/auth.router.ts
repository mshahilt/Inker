import { Router } from "express";
import { AuthController } from "../controllers/implementation/auth.controller";
import { AuthService } from "../services/implementation/auth.service";
import { UserRepository } from "../repositories/implementation/user.repository";
import validate from "@/middlewares/validate.middleware";
import signupSchema from "@/schema/signup-schema";
import signinSchema from "@/schema/signin.schema";
import verifyOtpSchema from "@/schema/verify-otp.schema";

const authRouter = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post(
  "/register",
  validate(signupSchema),
  authController.signup.bind(authController)
);
authRouter.post(
  "/login",
  validate(signinSchema),
  authController.signin.bind(authController)
);
authRouter.post(
  "/otp",
  validate(verifyOtpSchema),
  authController.verifyOtp.bind(authController)
);

export default authRouter;

import { IUserModel } from "@/models/implementation/user.model";
import { IUser } from "@shared/index";

export interface IAuthService {
  signup(user: IUserModel): Promise<IUserModel>;
  signin(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyOtp(
    otp: string,
    email: string
  ): Promise<{ status: number; message: string }>;
}

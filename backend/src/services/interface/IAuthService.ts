import { IUser } from "shared/types";

export interface IAuthService {
  signup(user: IUser): Promise<string>;
  signin(
    identifier: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyOtp(
    otp: string,
    email: string
  ): Promise<{ status: number; message: string }>;
}

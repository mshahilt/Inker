import {IUserModel} from "@/models/implementation/user.model";
import {IUser} from "shared/types";

export interface IAuthService {

    signup(user: IUser): Promise<string>;

    signin(identifier: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;

    googleAuth(token: string): Promise<{ user: IUserModel; accessToken: string; refreshToken: string }>;

    verifyOtp(otp: string, email: string): Promise<{ user: IUserModel, accessToken: string, refreshToken: string }>;

    verifyForgotPassword(email: string): Promise<{ status: number; message: string }>;

    getResetPassword(token: string, password: string): Promise<{ status: number; message: string }>;

    refreshAccessToken(token: string): Promise<{ accessToken: string, refreshToken: string }>;

    getUser(userId: string): Promise<IUserModel>;

}

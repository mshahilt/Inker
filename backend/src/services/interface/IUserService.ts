import { IUserModel } from "@/models/implementation/user.model";

export interface IUserService {
    verifyEmail(id: string, email: string): Promise<IUserModel | null>
}
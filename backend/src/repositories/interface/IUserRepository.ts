import { IUserModel } from "@/models/implementation/user.model";
import { Types } from "mongoose";

export interface IUserRepository {
    create(user: Partial<IUserModel>): Promise<IUserModel>
    findUserById(id: Types.ObjectId): Promise<IUserModel | null>
    findByEmail(email: string): Promise<IUserModel | null>
    update(id: Types.ObjectId, data: Partial<IUserModel>): Promise<IUserModel | null>
} 
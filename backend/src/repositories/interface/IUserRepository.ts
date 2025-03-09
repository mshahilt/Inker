import { IUserModel } from "@/models/implementation/user.model";
import { Types } from "mongoose";
import { IUser } from "shared/types";


export interface IUserRepository {
    create(user: IUserModel): Promise<IUserModel>;

    findByEmail(email: string): Promise<IUserModel | null>;

    findByUsername(username: string): Promise<IUserModel | null>

    findUserById(id: Types.ObjectId): Promise<IUserModel | null>

    update(id: Types.ObjectId, data: Partial<IUserModel>): Promise<IUserModel | null>

    findOneWithUsernameOrEmail(value: string): Promise<IUserModel | null>
}

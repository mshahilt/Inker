import {IUserModel} from "@/src/models/implementation/user.model";

export interface IUserRepository {
    create(user: IUserModel): Promise<IUserModel>;

    findByEmail(email: string): Promise<IUserModel | null>;
}
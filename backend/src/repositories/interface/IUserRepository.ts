import { IUserModel } from "@/models/implementation/user.model";

export interface IUserRepository {
    create(user: IUserModel): Promise<IUserModel>;

    findByEmail(email: string): Promise<IUserModel | null>;

    findByUsername(username:string) : Promise<IUserModel | null>

    findOneWithUsernameOrEmail(value:string) : Promise<IUserModel | null>
}
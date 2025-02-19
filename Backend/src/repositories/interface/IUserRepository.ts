import {IUser} from "shared/types"

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;

    findByEmail(email: string): Promise<IUser | null>;
}
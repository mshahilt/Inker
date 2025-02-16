import { IUser } from "../../models/interface/IUser";

//!  Interface for User Repository
export interface IUserRepository{
    create(user: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
}
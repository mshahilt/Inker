import { IUser } from "../../models/interface/IUser";
import { IUserRepository } from "../interface/IUserRepository";
import User from "../../models/implementation/user.model";


//!   Implementation for User Repository
export class UserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        try {
            return await User.create(user);
        } catch (error) {
            console.error(error)
            throw new Error("Error creating user")
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            return await User.findOne({email})
        } catch (error) {
            console.error(error)
            throw new Error("Error finding user by email")
        }
    }
}
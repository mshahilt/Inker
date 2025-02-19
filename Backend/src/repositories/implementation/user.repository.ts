import { IUser } from "shared/types";
import { IUserRepository } from "../interface/IUserRepository";
import User from "../../models/implementation/user.model";

// <<<<<<< HEAD
import { BaseRepository } from "../base.repository";

//!   Implementation for User Repository
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }
// =======

// export class UserRepository implements IUserRepository {
//     async create(user: IUser): Promise<IUser> {
//         try {
//             return await User.create(user);
//         } catch (error) {
//             console.error(error)
//             throw new Error("Error creating user")
//         }
//     }
// >>>>>>> 862c793 (edited docker-compose, initial setup changes and indroduced shared for global type management)

  async createUser(user: IUser): Promise<IUser> {
    try {
      return await this.create(user);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.findOne({ email });
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user by email");
    }
  }
}

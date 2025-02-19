import { IUser } from "../../models/interface/IUser";
import { IUserRepository } from "../interface/IUserRepository";
import User from "../../models/implementation/user.model";
import { BaseRepository } from "../base.repository";

//!   Implementation for User Repository
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

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

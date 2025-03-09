import { IUserRepository } from "../interface/IUserRepository";
import User, { IUserModel } from "../../models/implementation/user.model";
import { BaseRepository } from "../base.repository";
import { Types } from "mongoose";

export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository {
  constructor() {
    super(User);
  }
  async createUser(user: IUserModel): Promise<IUserModel> {
    try {
      return await this.create(user);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  }

  async findByEmail(email: string): Promise<IUserModel | null> {
    try {
      return await this.findOne({ email });
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user by email");
    }
  }

  async findUserById(id: Types.ObjectId): Promise<IUserModel | null> {
    try {
      return await this.findById(id)
    } catch (error) {
      console.error(error)
      throw new Error("Error finding user by id")
    }
  }

  async update(id: Types.ObjectId, data: Partial<IUserModel>): Promise<IUserModel | null> {
    try {
      return await this.findByIdAndUpdate(id, data)
    } catch (error) {
      console.error(error)
      throw new Error("Error updating user by id")
    }
  }
  async findByUsername(username: string): Promise<IUserModel | null> {
    try {
      return await this.findOne({ username })
    } catch (error) {
      console.error(error);
      throw new Error("Error while finding user by email")
    }
  }

  async findOneWithUsernameOrEmail(value: string): Promise<IUserModel | null> {
    try {
      return await this.findByUsernameOrEmail(value)
    } catch (error) {
      console.error(error);
      throw new Error("errror while finding user by email,username")
    }
  }


}

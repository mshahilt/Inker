import { IUserRepository } from "../interface/IUserRepository";
import User, { IUserModel } from "../../models/implementation/user.model";
import { BaseRepository } from "../base.repository";

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

  async findByUsername(username: string): Promise<IUserModel | null> {
    try {
      return await this.findOne({ username });
    } catch (error) {
      console.error(error);
      throw new Error("Error while finding user by email");
    }
  }

  async findOneWithUsernameOrEmail(value: string): Promise<IUserModel | null> {
    try {
      return await this.findByUsernameOrEmail(value);
    } catch (error) {
      console.error(error);
      throw new Error("errror while finding user by email,username");
    }
  }

  async updatePassword(email: string, hashedPassword: string): Promise<IUserModel | null> {
    try {
      return await this.model.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true });
    } catch (error) {
      console.error(error);
      throw new Error("errror while updating the password");
    }
  }

  async updateUsername(id: string, username: string): Promise<IUserModel | null> {
    try {
      return await this.model.findByIdAndUpdate(id, { $set: { username: username } })
    } catch (error) {
      console.log(error)
      throw new Error("error while updating username")
    }
  }
}

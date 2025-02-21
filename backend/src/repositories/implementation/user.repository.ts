import { IUserRepository } from "../interface/IUserRepository";
import User, {IUserModel} from "../../models/implementation/user.model";
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
}

import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IProfileService } from "../interface/IProfileService";
import { createHttpError } from "@/utils/http-error.util";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IUserModel } from "@/models/implementation/user.model";


//!   Implementation for Profile Service
export class ProfileService implements IProfileService {
  constructor(private _userRepository: IUserRepository) { }

  async getProfile(username: string): Promise<IUserModel> {
    const userDetails = await this._userRepository.findByUsername(username);

    if (!userDetails) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    return userDetails
  }


  async usernameUpdate(id: string, username: string): Promise<string | undefined> {
    const isExist = await this._userRepository.findByUsername(username);

    if (isExist?._id == id) {
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.SAME_USERNAME);
    }
    if (isExist) {
      throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USERNAME_EXIST);
    }

    const user = await this._userRepository.updateUsername(id, username);
    return user ? user.username : undefined;
  }

}

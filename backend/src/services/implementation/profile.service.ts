import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IProfileService } from "../interface/IProfileService";
import { createHttpError, uploadToCloudinary } from "@/utils";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IUserModel } from "@/models/implementation/user.model";
import { generateNanoId } from "@/utils/generate-nanoid";
import {
  deleteFromCloudinary,
  getPublicIdFromUrl,
  isCloudinaryUrl,
} from "@/utils/cloudinary.util";
import { IBlogRepository } from "@/repositories/interface/IBlogRepository";
import { ICommentRepository } from "@/repositories/interface/ICommentRepository";

//!   Implementation for Profile Service
export class ProfileService implements IProfileService {
  constructor(
    private _userRepository: IUserRepository,
    private _blogRepository: IBlogRepository,
    private _commentRepository: ICommentRepository
  ) {}

  async getProfile(username: string): Promise<IUserModel> {
    const userDetails = await this._userRepository.findByUsername(username);

    if (!userDetails) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    return userDetails;
  }

  async usernameUpdate(
    id: string,
    username: string
  ): Promise<string | undefined> {
    const isExist = await this._userRepository.findByUsername(username);

    if (isExist?._id == id) {
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.SAME_USERNAME);
    }
    if (isExist) {
      throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USERNAME_EXIST);
    }

    const user = await this._userRepository.updateUsername(id, username);
    await this._blogRepository.updateUsername(id, username);
    await this._commentRepository.updateUsername(id, username);
    return user ? user.username : undefined;
  }

  async updateProfile(
    id: string,
    updateData: Partial<IUserModel>
  ): Promise<IUserModel> {
    const isExist = await this._userRepository.findUserById(id);

    const allowedFields: (keyof IUserModel)[] = [
      "name",
      "bio",
      "socialLinks",
      "resume",
      "dateOfBirth",
    ];

    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) =>
          allowedFields.includes(key as keyof IUserModel) && value !== undefined
      )
    ) as Partial<IUserModel>;

    if (!isExist) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }

    const updatedData = await this._userRepository.updateUserProfile(
      id,
      filteredData
    );

    if (!updatedData) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    return updatedData;
  }

  // async updateEmail(id: string, email: string): Promise<IUserModel> {
  //   const existingEmail = await this._userRepository.findByEmail(email);

  //   if (existingEmail) {
  //     throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_EXIST)
  //   }

  //   const isEmailReal = await checkEmailExistence(email)

  //   if (!isEmailReal) {
  //     throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.INVALID_EMAIL)
  //   }

  //   // need otp verification before updating email
  //   const updateEmail = await this._userRepository.updateEmail(id, email)

  //   if (!updateEmail) {
  //     throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND)
  //   }

  //   return updateEmail;
  // }

  async updateProfilePicture(
    userId: string,
    file: Express.Multer.File
  ): Promise<string> {
    const isExist = await this._userRepository.findUserById(userId);

    if (!isExist) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }

    const uniqueId = generateNanoId();

    const result = await uploadToCloudinary(file, "profilePicture", uniqueId);

    if (isExist.profilePicture && isCloudinaryUrl(isExist.profilePicture)) {
      const publicId = getPublicIdFromUrl(isExist.profilePicture);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await this._userRepository.updateProfilePicture(userId, result.secure_url);
    await this._blogRepository.updateProfilePicture(userId, result.secure_url);
    await this._commentRepository.updateProfilePicture(
      userId,
      result.secure_url
    );
    return result.secure_url;
  }
}

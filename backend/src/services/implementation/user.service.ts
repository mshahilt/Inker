import { HttpResponse, HttpStatus } from "@/constants";
import { IUserModel } from "@/models/implementation/user.model";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IUserService } from "@/services/interface";
import { checkEmailExistence, createHttpError, toObjectId } from "@/utils";

export class UserService implements IUserService {

    constructor(private readonly userRepository: IUserRepository) { }

    async verifyEmail(id: string, email: string): Promise<IUserModel | null> {
        const existingEmail = await this.userRepository.findByEmail(email);


        if (existingEmail) {
            throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_EXIST)
        }

        const isEmailReal = await checkEmailExistence(email)

        if (!isEmailReal) {
            throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.INVALID_EMAIL)
        }

        const userId = toObjectId(id)

        const findUser = await this.userRepository.findUserById(userId)

        return await this.userRepository.update(findUser?.id, { email })
    }
}
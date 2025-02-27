import { HttpResponse, HttpStatus } from "@/constants";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IUserService } from "@/services/interface";
import { toObjectId } from "@/utils/convert-object-id.utils";
import { checkEmailExistence } from "@/utils/email-verification.utils";
import { createHttpError } from "@/utils/http-error.util";

export class UserService implements IUserService {

    constructor(private readonly userRepository: IUserRepository) { }

    async verifyEmail(id: string, email: string): Promise<void> {
        try {
            const existingEmail = await this.userRepository.findByEmail(email);


            if (existingEmail) {
                throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_EXIST)
            }

            const isEmailReal = await checkEmailExistence(email)

            if (!isEmailReal) {
                throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.INVALID_EMAIL)
            }

            const userId = toObjectId(id)

            console.log("user id is there: ", userId, typeof userId)

            const findUser = await this.userRepository.findUserById(userId)

            const updatedEmail = await this.userRepository.update(findUser?.id, { email })

            console.log("update email", updatedEmail)
        } catch (error) {
            console.log(error)
        }

    }
}
import { validate } from "deep-email-validator"

const ValidatorOptions = {
    validateSMTP: true,
    validateDNS: true,
    validateRegex: true,
    validateTypo: true,
    validateDisposable: true,
    validateFree: false
}

export const checkEmailExistence = async (email: string): Promise<boolean> => {
    const result = await validate({ email, ...ValidatorOptions })

    return result.valid
}
import bcrypt from 'bcryptjs'

export async function hashPassword(value: string): Promise<string> {
    const salt = 10
    return bcrypt.hash(value, salt);
}
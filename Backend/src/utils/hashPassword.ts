import bcrypt from 'bcrypt'

export async function hashPassword(value: string): Promise<string> {
    const salt = 10
    const result = await bcrypt.hash(value, salt) 
    return result   
}
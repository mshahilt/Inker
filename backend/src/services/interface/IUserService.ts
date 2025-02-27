export interface IUserService {
    verifyEmail(id: string, email: string): Promise<void>
}
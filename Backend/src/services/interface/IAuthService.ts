import { IUser } from "../../models/interface/IUser";



export interface IAuthService {
    signup(user: IUser): Promise<string>
}
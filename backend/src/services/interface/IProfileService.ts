import { IUserModel } from "@/models/implementation/user.model";

export interface IProfileService {

    getProfile(username: string): Promise<IUserModel>;

    usernameUpdate(id: string, username: string): Promise<string | undefined>;

}

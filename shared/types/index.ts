export interface IUser {
    _id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    status: "active" | "blocked";
    role: "user" | "moderator";
    bio: string;
    profilePicture?: string;
    socialLinks: { type: string; url: string }[];
    resume?: string;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}
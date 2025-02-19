export interface IUser {
    _id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    status: "active" | "blocked";
    role: "user" | "moderator";
    bio: string;
    profile_picture?: string;
    social_links: { type: string; url: string }[];
    resume?: string;
    date_of_birth: Date;
    createdAt: Date;
    updatedAt: Date;
}
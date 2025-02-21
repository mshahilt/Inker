import {model, Schema, Document} from "mongoose";
import {IUser} from "shared/types";

// interface IUser {
//     _id: string;
//     username: string;
//     name: string;
//     email: string;
//     password: string;
//     status: "active" | "blocked";
//     role: "user" | "moderator";
//     bio: string;
//     profile_picture?: string;
//     social_links: { type: string; url: string }[];
//     resume?: string;
//     date_of_birth: Date;
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface IUserModel extends Document, Omit<IUser, "_id"> {}

const userSchema = new Schema<IUserModel>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },
        role: {
            type: String,
            enum: ["user", "moderator"],
            default: "user",
        },
        bio: {
            type: String,
        },
        profile_picture: {
            type: String,
        },
        social_links: [
            {
                type: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
        resume: {
            type: String,
        },
        date_of_birth: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);


const User = model<IUserModel>('User', userSchema);
export default User
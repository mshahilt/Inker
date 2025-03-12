import { Types } from "mongoose";

export const toObjectId = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid object id format") // correctc respnose  add in here
    }
    return new Types.ObjectId(id)
}
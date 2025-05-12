import {AuthJwtPayload} from "@/types/jwt-payload";

declare module 'express' {
    export interface Request {
        user?: AuthJwtPayload;
    }
}

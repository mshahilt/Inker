import  jwt from "jsonwebtoken"
import { env } from "../configs/env.config"


const ACCESS_KEY = env.JWT_ACCESS_SECRET as string
const REFRESH_KEY = env.JWT_REFRESH_SECRET as string

const ACCESS_TOKEN_EXPIRY =  '1h'
const  REFRESH_TOKEN_EXPIRY = '7d'
export  function generateAccessToken  (payload:Object,expiresIn:string = ACCESS_TOKEN_EXPIRY):string{
   
        return jwt.sign(payload,ACCESS_KEY,{expiresIn})
    
}

export  function generateRefreshToken  (payload:Object,expiresIn:string = REFRESH_TOKEN_EXPIRY):string{
   
    return jwt.sign(payload,REFRESH_KEY,{expiresIn})

}



export  function verifyAccessToken (token:string):object|null{
    try {
        return jwt.verify(token,ACCESS_KEY) as object
    } catch (error:unknown) {
        return null
    }
}

export function verifyRefreshToken (token:string):object|null{
     try {
            return jwt.verify(token,REFRESH_KEY) as object
     } catch (error:unknown) {
        return null
     }
}
//* libraries and packages
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { Request, Response } from "express"

import { validateEnv } from "./utils/validate-env.util"
dotenv.config()
validateEnv()

//* configs
import { connectDb } from "./configs/mongo.config"
import { connectRedis } from "./configs/redis.config"

//* routers
import authRouter from "./routers/auth.router"

const PORT = 3000
const app = express()
app.use(cors())


connectDb()
connectRedis()

app.get('/',(req:Request,res:Response)=>{
    /*
        @muhammedsirajudeen
        return statements must be void simple source of error avoid it.
    */


    res.status(200).json({message:"success"})
    return 
});

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT} ✅`))

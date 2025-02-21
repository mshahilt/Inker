//* libraries and packages
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

//* validating all the env
import { validateEnv } from "./utils/validate-env.util"

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

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT} ✅`))

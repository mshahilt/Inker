//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

//* validating all the env
import { validateEnv } from "./utils/validate-env.util";

validateEnv();

//* configs
import { connectDb } from "./configs/mongo.config";
import { connectRedis } from "./configs/redis.config";

//* routers
import authRouter from "@/routers/auth.router";
import userRouter from "@/routers/user.router"
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middlware";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
// connectRedis();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at ${PORT} ✅`));

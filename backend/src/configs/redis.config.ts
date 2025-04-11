import { createClient, RedisClientType } from "redis"
import { env } from "@/configs/env.config"

let redisClient: RedisClientType;

function connectRedis() {

  redisClient = createClient({
    url: env.REDIS_URL,
    socket: {
      reconnectStrategy(retries) {
        if (retries > 5) {
          console.error("Max Redis reconnect attempts reached.");
          return false;
        }
        return Math.min(retries * 100, 2000);
      },
    },

  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  redisClient.connect();
}

export { connectRedis, redisClient };

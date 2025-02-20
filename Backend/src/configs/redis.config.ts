import {createClient, RedisClientType} from "redis"
import {env} from "@/configs/env.config"

let redisClient: RedisClientType

function connectRedis() {
    redisClient = createClient({
        url: env.REDIS_URI
    })

    redisClient.on('connect', () => {
        console.log(`Connected to redis`)
    })

    redisClient.on('error', (err) => {
        console.error('Redis connection error:', err)
    })

    redisClient.connect();
}

export {
    connectRedis,
    redisClient
} 
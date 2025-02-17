import { createClient, RedisClientType } from "redis"

let redisClient: RedisClientType

function connectRedis(){
redisClient = createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    }
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
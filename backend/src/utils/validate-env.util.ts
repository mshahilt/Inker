import { env } from "../configs/env.config";

export function validateEnv() {
  if (!env.PORT) {
    throw new Error("PORT is not found in the env");
  }
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is not found in the env");
  }
  if (!env.REDIS_HOST) {
    throw new Error("REDIS_HOST is not found in the env");
  }
  if (!env.REDIS_PORT) {
    throw new Error("REDIS_PORT is not found in the env");
  }
  if (!env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not found in the env");
  }
  if (!env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not found in the env");
  }
}

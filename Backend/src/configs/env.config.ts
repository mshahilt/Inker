import dotenv from "dotenv"

dotenv.config()

export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get JWT_ACCESS_SECRET() {
    return process.env.JWT_ACCESS_SECRET;
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET;
  },
  get REDIS_HOST() {
    return process.env.REDIS_HOST;
  },
  get REDIS_PORT() {
    return process.env.REDIS_PORT;
  },
};

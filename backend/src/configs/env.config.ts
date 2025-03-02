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
  get SENDER_EMAIL() {
    return process.env.SENDER_EMAIL;
  },
  get PASSKEY() {
    return process.env.PASSKEY;
  },
  get CLIENT_ORIGIN() {
    return process.env.CLIENT_ORIGIN;
  }
};

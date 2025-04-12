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
  get REDIS_URL() {
    return process.env.REDIS_URL;
  },
  get SENDER_EMAIL() {
    return process.env.SENDER_EMAIL;
  },
  get PASSKEY() {
    return process.env.PASSKEY;
  },
  get CLIENT_ORIGIN() {
    return process.env.CLIENT_ORIGIN;
  },
  get RESET_PASS_URL() {
    return process.env.RESET_PASS_URL;
  },
  get CLOUDINARY_CLOUD_NAME() {
    return process.env.CLOUDINARY_CLOUD_NAME;
  },
  get CLOUDINARY_API_KEY() {
    return process.env.CLOUDINARY_API_KEY;
  },
  get CLOUDINARY_API_SECRET() {
    return process.env.CLOUDINARY_API_SECRET;
  }
};

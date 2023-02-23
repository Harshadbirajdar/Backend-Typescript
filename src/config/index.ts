import * as dotenv from "dotenv";
import process from "process";
dotenv.config();

export default {
  PORT: process.env.PORT || "4000",
  env: process.env.env || "stagging",
  PREFIX: process.env.PREFIX || "/api/v1",
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/typescript",
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "yourSuperSecret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "yourSuperSecret",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "360",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "3",
  },
};

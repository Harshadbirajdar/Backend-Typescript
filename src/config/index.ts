import process from "process";

import * as dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || "4000",
  env: process.env.NODE_ENV || "stagging",
  PREFIX: process.env.PREFIX || "/api/v1",
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/typescript",
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "yourSuperSecret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "yourSuperSecret",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "360",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "3",
  },
  userVerification:
    process.env.USER_VERIFICATION_TOKEN_SECRET || "yourSuperSecret",
  verifyUrl: process.env.VERIFY_URL || "",
  email: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT) || 0,
    auth: {
      user: process.env.SMTP_USERNAME || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
    from: process.env.EMAIL_FROM || "",
  },
};

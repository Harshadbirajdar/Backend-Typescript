import * as dotenv from "dotenv";
import process from "process";

dotenv.config();

export default {
  PORT: process.env.PORT || "4000",
  env: process.env.env || "stagging",
  PREFIX: process.env.PREFIX || "/api/v1",
};

import winston from "winston";
import devLogger from "./devLogger";
import prodLogger from "./prodLogger";

let logger: winston.Logger;

if (process.env.NODE_ENV !== "production") {
  logger = devLogger();
} else {
  logger = prodLogger();
}

export default logger;

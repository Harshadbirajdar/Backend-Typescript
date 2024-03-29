import mongoose from "mongoose";

import logger from "../logger";
import seedService from "../services/seed.service";

import config from ".";

mongoose.set("strictQuery", true);

mongoose
  .connect(config.DB_URL)
  .then(() => {
    logger.info("Mongoose connection done");
  })
  .catch((e) => {
    logger.info("Mongoose connection error");
    logger.error(e);
  });

mongoose.connection.on("connected", () => {
  logger.debug("Mongoose default connection open to " + config.DB_URL);
  seedService.addUserAndRole();
});

mongoose.connection.on("error", (err) => {
  logger.error("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

export const connection = mongoose.connection;

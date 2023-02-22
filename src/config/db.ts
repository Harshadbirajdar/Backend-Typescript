import mongoose from "mongoose";
import config from ".";
import logger from "../logger";

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

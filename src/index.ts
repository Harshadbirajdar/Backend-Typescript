import cluster from "cluster";
import os from "os";

import app from "./app";
import config from "./config";
import "./config/db";
import logger from "./logger";

const numCPUs = config.env === "production" ? os.cpus().length : 1;

if (cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died`);
    logger.info("Starting a new worker");
    cluster.fork();
  });
} else {
  app.listen(config.PORT, (): void => {
    logger.info(
      `Worker ${process.pid} started and Server started successfully on port ${config.PORT}`
    );
  });
}

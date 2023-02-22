import app from "./app";
import config from "./config";
import logger from "./logger";
import "./config/db";

app.listen(config.PORT, (): void => {
  logger.info(`Server started successfully on port ${config.PORT}`);
});

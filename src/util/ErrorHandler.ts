import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import config from "../config";
import logger from "../logger";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message);
  res.json({
    success: "false",
    message: err.message,
    stack: config.env !== "production" ? err.stack : undefined,
  });
};

export default errorHandler;

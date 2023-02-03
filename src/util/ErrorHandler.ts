import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import config from "../config";
import logger from "../logger";

export const errorHandler: ErrorRequestHandler = (
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

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

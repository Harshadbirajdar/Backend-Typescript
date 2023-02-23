import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import config from "../config";
import httpStatus from "../util/httpStatus";
import logger from "../logger";
import ApiError, { IApiError } from "../helper/ApiError";

export const errorHandler: ErrorRequestHandler = (
  err: IApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message);
  const { message, statusCode } = err;

  res.status(statusCode || httpStatus.forbidden).json({
    success: "false",
    message: message,
    stack: config.env !== "production" ? err.stack : undefined,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(
    httpStatus.notFound,
    `Not Found - ${req.originalUrl}`
  );

  next(error);
};

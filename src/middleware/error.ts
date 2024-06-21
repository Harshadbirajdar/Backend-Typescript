import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

import config from "../config";
import ApiError, { IApiError } from "../helper/ApiError";
import logger from "../logger";
import httpStatus from "../util/httpStatus";

export const errorHandler: ErrorRequestHandler = (
  err: IApiError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(
    `Error occurred for request ID: ${req.id}. Message: ${err.message}`
  );
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

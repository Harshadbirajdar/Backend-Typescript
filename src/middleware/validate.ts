/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiError from "../helper/ApiError";
import logger from "../logger";
import httpStatus from "../util/httpStatus";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}
export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      logger.error(message);

      next(new ApiError(httpStatus.badRequest, message));
    } catch (error) {
      next(error);
    }
  };

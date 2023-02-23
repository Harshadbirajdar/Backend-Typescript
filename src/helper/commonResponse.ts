import { Response } from "express";
import httpStatus from "../util/httpStatus";

const commonResponse = (
  res: Response,
  message: string,
  data: unknown,
  statusCode: httpStatus = httpStatus.ok,
  success = true
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default commonResponse;

import { Response, Request, NextFunction } from "express";

import logger from "../logger";

const requestInfo = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const ip =
    req.headers?.["x-forwarded-for"] || req.ip || req.socket["remoteAddress"];
  const path = req.path;
  const params = req.params;
  const query = req.query;
  const method = req.method;
  const body = { ...req.body };
  const requestId = req.id;
  delete body?.password; //sensitive data which should not be logged
  delete body?.confirmPassword; //sensitive data which should not be logged
  delete body?.token; //sensitive data which should not be logged

  const infoObject = {
    requestId,
    ip,
    path,
    body,
    params,
    query,
    method,
  };

  logger.info(`Request Info - ${JSON.stringify(infoObject)}`);

  next();
};

export default requestInfo;

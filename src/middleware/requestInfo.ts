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
  const params = JSON.stringify(req.params);
  const query = JSON.stringify(req.query);
  const method = JSON.stringify(req.method);
  const body = { ...req.body };
  delete body?.password; //sensitive data which should not be logged
  delete body?.confirmPassword; //sensitive data which should not be logged
  delete body?.token; //sensitive data which should not be logged

  const infoObject = {
    ip,
    path,
    body: JSON.stringify(body),
    params,
    query,
    method,
  };

  logger.info(`Request Info - ${JSON.stringify(infoObject)}`);

  next();
};

export default requestInfo;

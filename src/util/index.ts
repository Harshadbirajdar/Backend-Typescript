import { Request } from "express";

const getIpFromReq = (req: Request): string => {
  return req.headers?.["x-forwarded-for"] as string;
};

export { getIpFromReq };

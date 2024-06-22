import { NextFunction, Response } from "express";

import asyncHandler from "../helper/asyncHandler";
import logger from "../logger";
import client from "../services/cache";
import { getCache, setCache } from "../services/cache/manager";
import { ProtectedRequest } from "../types/app-request";
import { getIpFromReq } from "../util";

interface RateLimiterParams {
  maxRequests: number;
  durationSeconds: number;
  forSpecificUserId?: boolean;
  message?: string;
}

export default function rateLimiter(params: RateLimiterParams) {
  return asyncHandler(
    async (
      req: ProtectedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { maxRequests, durationSeconds, forSpecificUserId, message } =
        params;

      if (req.headers.bypassratelimiter) {
        next();
        return;
      }

      const identifier =
        getIpFromReq(req) || (req.user?._id && String(req.user._id));

      if (!identifier) {
        logger.warn(
          `RateLimiter: Unable to find IP or userId for ratelimiter - Path: ${req.path}`
        );
        next();
        return;
      }

      const prefix =
        forSpecificUserId && req.user?._id ? req.user._id : identifier;
      const key = `RATELIMITERKEY_${prefix}_${req.path}`;

      let totalRequests = (await getCache(key)) as null | number;
      totalRequests = totalRequests !== null ? Number(totalRequests) : 0;

      if (totalRequests === 0) {
        setCache(key, 1, durationSeconds);
      }

      if (totalRequests === 1) {
        client.expire(key, durationSeconds);
      }

      if (totalRequests > maxRequests) {
        res.status(429).json({
          error:
            message ||
            `Too many requests! Please try again after ${durationSeconds} seconds.`,
        });
        return;
      }

      client.incr(key);
      next();
    }
  );
}

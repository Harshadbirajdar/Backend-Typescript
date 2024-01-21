import { Response, NextFunction } from "express";

import ApiError from "../helper/ApiError";
import asyncHandler from "../helper/asyncHandler";
import { IUser } from "../model/user.model";
import roleService from "../services/role.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import { ProtectedRequest } from "../types/app-request";
import httpStatus from "../util/httpStatus";

const isLoggedIn = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return next(
        new ApiError(httpStatus.unauthorized, "Please login first to access")
      );

    const payload = await tokenService.verifyToken(token, "accessToken");
    if (payload) {
      const id = (payload as IUser)._id;

      const user = await userService.getUserById(id);
      if (!user)
        return next(new ApiError(httpStatus.unauthorized, "User Not Found"));

      req.user = user;

      next();
    }
  }
);

const isAllowed = (...requiredRights: string[]) =>
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    const user = req.user;

    if (!user)
      return next(new ApiError(httpStatus.unauthorized, "User Not found"));

    const role = await roleService.getRoleById(user.role);

    let isAllowed = false;

    for (let i = 0; i < requiredRights.length; i++) {
      if (role?.rights.includes(requiredRights[i])) {
        isAllowed = true;
        break;
      }
      isAllowed = false;
    }

    if (!isAllowed)
      return next(
        new ApiError(
          httpStatus.unauthorized,
          "Your are not allowed to do this operation "
        )
      );

    next();
  });

export { isLoggedIn, isAllowed };

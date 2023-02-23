import { Response, NextFunction } from "express";
import httpStatus from "../util/httpStatus";
import ApiError from "../helper/ApiError";
import asyncHandler from "../helper/asyncHandler";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import { IUser } from "../model/user.model";
import { ProtectedRequest } from "../types/app-request";

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

export { isLoggedIn };

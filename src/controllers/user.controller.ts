import { Request, Response } from "express";
import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import userService from "../services/user.service";
import httpStatus from "../util/httpStatus";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  return commonResponse(
    res,
    "User Created Successfully",
    user,
    httpStatus.created
  );
});

export default {
  createUser,
};

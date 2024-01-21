import { Types } from "mongoose";

import ApiError from "../helper/ApiError";
import httpStatus from "../util/httpStatus";

import tokenService from "./token.service";
import userService from "./user.service";

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.unauthorized, "Incorrect email or password");
  }
  return user;
};

const registerUser = async (name: string, email: string, password: string) => {
  const user = await userService.createUser({ name, email, password });
  return user;
};

const verifyEmail = async (token: string) => {
  const tokenData = (await tokenService.verifyToken(token, "verify")) as {
    id: Types.ObjectId;
  };

  const user = await userService.verifyUser(tokenData.id);
  return user;
};

export default {
  loginUserWithEmailAndPassword,
  registerUser,
  verifyEmail,
};

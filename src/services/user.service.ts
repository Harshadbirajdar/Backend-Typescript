import { Types } from "mongoose";
import ApiError from "../helper/ApiError";
import UserModel from "../model/user.model";
import httpStatus from "../util/httpStatus";
import { CreateUser } from "../types/user";

const createUser = async (userBody: CreateUser) => {
  if (await UserModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.badRequest, "User is already exist");
  }
  return UserModel.create(userBody);
};

const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const getUserById = (id: Types.ObjectId) => {
  return UserModel.findById(id);
};

const verifyUser = async (id: Types.ObjectId) => {
  const user = await getUserById(id);
  if (!user) throw new ApiError(httpStatus.notFound, "User Not found");

  if (user.verified)
    throw new ApiError(httpStatus.conflict, "User is already verified.");

  return UserModel.findByIdAndUpdate(id, { verified: true });
};
export default {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
};

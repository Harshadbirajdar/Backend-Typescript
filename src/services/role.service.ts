import { Types } from "mongoose";
import RoleModel from "../model/role.model";
import ApiError from "../helper/ApiError";
import httpStatus from "../util/httpStatus";

const getRoleById = async (id: Types.ObjectId) => {
  return await RoleModel.findById(id);
};

const getDefaultRole = async () => {
  return await RoleModel.findOne({ isDefaultRole: true });
};

const createRole = async (
  name: string,
  rights: string[],
  isDefaultRole: boolean
) => {
  if (isDefaultRole) {
    const isDefaultRoleExist = await getDefaultRole();
    if (isDefaultRoleExist)
      throw new ApiError(httpStatus.conflict, "Default role already exist");
  }
  return await RoleModel.create({ name, rights, isDefaultRole });
};

export default {
  getRoleById,
  createRole,
  getDefaultRole,
};

import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import userService from "../services/user.service";

const register = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return commonResponse(res, "User register successfully", user);
});

export default { register };

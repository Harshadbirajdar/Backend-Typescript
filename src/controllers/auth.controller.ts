import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";

const register = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return commonResponse(res, "User register successfully", user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);

  user.password = undefined as unknown as string;

  return commonResponse(res, "User login successfully", { user, token });
});

export default { register, login };

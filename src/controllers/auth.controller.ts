import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import authService from "../services/auth.service";
import emailService from "../services/email.service";
import tokenService from "../services/token.service";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);
  const verificationToken = await user.generateVerificationToken();

  await emailService.sendVerificationMail(email, name, verificationToken);

  user.password = undefined as unknown as string;

  return commonResponse(res, "User register successfully", user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);

  user.password = undefined as unknown as string;

  return commonResponse(res, "User login successfully", { user, ...token });
});

const verify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await authService.verifyEmail(token);

  return commonResponse(res, "User verified successfully", user);
});

export default { register, login, verify };

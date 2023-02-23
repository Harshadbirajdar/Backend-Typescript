import ApiError from "../helper/ApiError";
import httpStatus from "../util/httpStatus";
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

export default {
  loginUserWithEmailAndPassword,
};

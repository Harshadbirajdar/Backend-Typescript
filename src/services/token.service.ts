import moment, { Moment } from "moment";
import config from "../config";
import jwt from "jsonwebtoken";
import { IUser } from "../model/user.model";
import { Types } from "mongoose";

type Token = "refreshToken" | "accessToken";

const generateToken = (
  userId: Types.ObjectId,
  expires: Moment,
  secret: string
) => {
  const payload = {
    _id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user: IUser) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    config.jwt.accessSecret
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user._id,
    refreshTokenExpires,
    config.jwt.refreshSecret
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token: string, secret: Token) => {
  if (secret === "accessToken") {
    return await jwt.verify(token, config.jwt.accessSecret);
  } else if (secret === "refreshToken") {
    return await jwt.verify(token, config.jwt.refreshSecret);
  }
};
export default { generateAuthTokens, verifyToken };

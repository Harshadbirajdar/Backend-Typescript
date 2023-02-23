import moment, { Moment } from "moment";
import config from "../config";
import jwt from "jsonwebtoken";
import { IUser } from "../model/user.model";
import { Types } from "mongoose";

const generateToken = (userId: Types.ObjectId, expires: Moment) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, config.jwt.secret);
};

const generateAuthTokens = async (user: IUser) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user._id, accessTokenExpires);

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(user._id, refreshTokenExpires);

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

export default { generateAuthTokens };

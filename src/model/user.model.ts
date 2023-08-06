/* eslint-disable no-unused-vars */
import { Schema, model, Types, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import roleService from "../services/role.service";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: Types.ObjectId;
  isPasswordMatch(password: string): boolean;
  generateVerificationToken(): string;
}
interface IuserMethod extends Model<IUser> {
  isEmailTaken(email: string): boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
  },
  verified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  role: {
    type: Schema.Types.ObjectId,
  },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.methods.generateVerificationToken = async function () {
  const verificationToken = await jwt.sign(
    { id: this._id },
    config.userVerification,
    { expiresIn: "7d" }
  );

  return verificationToken;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  if (this.role === undefined) {
    const defaultRole = await roleService.getDefaultRole();
    defaultRole && (this.role = defaultRole._id);
  }
  next();
});

const UserModel = model<IUser, IuserMethod>("User", userSchema);
export default UserModel;

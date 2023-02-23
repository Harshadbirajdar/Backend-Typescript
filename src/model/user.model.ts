/* eslint-disable no-unused-vars */
import { Schema, model, Types, Model, Document } from "mongoose";
import bcrypt from "bcrypt";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
}
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: Role;
  isPasswordMatch(password: string): boolean;
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
    type: Schema.Types.String,
    enum: Object.keys(Role),
    default: Role.USER,
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const UserModel = model<IUser, IuserMethod>("User", userSchema);
export default UserModel;

import { Schema, model, Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: string;
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
    enum: ["USER", "ADMIN", "SUPER_ADMIN"],
    default: "USER",
  },
});

export const UserModel = model<IUser>("User", userSchema);

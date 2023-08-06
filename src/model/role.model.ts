/* eslint-disable no-unused-vars */
import { Schema, model, Types, Document } from "mongoose";
import Role from "../enums/role.enum";

export interface RoleDoc extends Document {
  _id: Types.ObjectId;
  name: string;
  rights: string[];
  isDefaultRole: boolean;
}

const roleSchema = new Schema<RoleDoc>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  isDefaultRole: {
    type: Schema.Types.Boolean,
    default: false,
  },
  rights: {
    type: [{ type: Schema.Types.String, enum: Object.values(Role) }],
  },
});

const RoleModel = model<RoleDoc>("Role", roleSchema);
export default RoleModel;

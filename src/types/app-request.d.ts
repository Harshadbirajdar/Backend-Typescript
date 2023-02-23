import { Request } from "express";
import { IUser } from "../model/user.model";

declare interface ProtectedRequest extends Request {
  user?: IUser;
}

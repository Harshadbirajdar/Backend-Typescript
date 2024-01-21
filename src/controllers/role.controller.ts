import { Request, Response } from "express";

import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import logger from "../logger";
import roleService from "../services/role.service";

const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { name, rights, isDefaultRole } = req.body;
  const role = await roleService.createRole(name, rights, isDefaultRole);

  logger.info("new Role created " + JSON.stringify(role));

  return commonResponse(res, "Role created successfully", role);
});

export default { createRole };

import express, { Router } from "express";

import roleController from "../../controllers/role.controller";
import Role from "../../enums/role.enum";
import { isAllowed, isLoggedIn } from "../../middleware/auth";
import validate from "../../middleware/validate";
import roleValidation from "../../validations/role.validation";

const router: Router = express.Router();

router.post(
  "/",
  validate(roleValidation.createRole),
  isLoggedIn,
  isAllowed(Role.CREATE_ROLE),
  roleController.createRole
);

export default router;

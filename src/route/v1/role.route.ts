import express, { Router } from "express";
import validate from "../../middleware/validate";
import roleValidation from "../../validations/role.validation";
import { isAllowed, isLoggedIn } from "../../middleware/auth";
import Role from "../../enums/role.enum";
import roleController from "../../controllers/role.controller";

const router: Router = express.Router();

router.post(
  "/",
  validate(roleValidation.createRole),
  isLoggedIn,
  isAllowed(Role.CREATE_ROLE),
  roleController.createRole
);

export default router;

import express, { Router } from "express";
import authController from "../../controllers/auth.controller";
import userController from "../../controllers/user.controller";
import validate from "../../middleware/validate";
import authValidation from "../../validations/auth.validation";

const router: Router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  userController.createUser
);

router.post("/login", validate(authValidation.login), authController.login);

export default router;

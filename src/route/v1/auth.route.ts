import express, { Router } from "express";
import authController from "../../controllers/auth.controller";
import validate from "../../middleware/validate";
import authValidation from "../../validations/auth.validation";

const router: Router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

router.get("/verify/:token", authController.verify);

export default router;

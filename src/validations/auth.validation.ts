import Joi from "joi";

const register = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email().message("Please enter valid email"),
  password: Joi.string()
    .required()
    .min(6)
    .message("Password should be minimum 6 characters"),
});

const login = Joi.object().keys({
  email: Joi.string().required().email().message("Please enter valid email"),
  password: Joi.string()
    .required()
    .min(6)
    .message("Password should be minimum 6 characters"),
});

export default { register, login };

import Joi from "joi";
import Role from "../enums/role.enum";

const createRole = Joi.object().keys({
  name: Joi.string().required(),
  rights: Joi.array()
    .items(Joi.string().valid(...Object.values(Role)))
    .required()
    .min(1)
    .unique(),
  isDefaultRole: Joi.boolean().optional(),
});

export default { createRole };

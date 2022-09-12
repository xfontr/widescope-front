import Joi from "joi";

const loginSchema = Joi.object({
  search: Joi.string().min(3).max(15).required(),
});

export default loginSchema;

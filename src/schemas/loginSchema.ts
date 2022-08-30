import Joi from "joi";

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).max(25).required(),
});

export default loginSchema;

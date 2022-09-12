import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).max(25).required(),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
  email: Joi.string().min(10).max(25).required(),
});

export default registerSchema;

import Joi from "joi";

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(15).required().label("User name"),
  password: Joi.string().min(6).max(25).required().label("Password"),
});

export default loginSchema;

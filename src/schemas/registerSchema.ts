import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(15).required().label("User name"),
  password: Joi.string().min(6).max(25).required().label("Password"),
  repeatPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Repeat password")
    .messages({ "any.only": "Passwords don't match" }),
  email: Joi.string().min(10).max(25).required().label("Email address"),
});

export default registerSchema;

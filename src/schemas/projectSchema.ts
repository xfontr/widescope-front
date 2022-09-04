import Joi from "joi";

const projectSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  description: Joi.string().min(10).max(500).required(),
  logo: Joi.string().min(10).max(200).required(),
  repository: Joi.string().min(10).max(200).required(),
  technologyBack: Joi.string().min(3).max(10).required(),
  technologyFront: Joi.string().min(3).max(10).required(),
});

export default projectSchema;
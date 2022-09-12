import Joi from "joi";

const projectSchema = Joi.object({
  name: Joi.string().min(2).max(25).required().label("Project name"),
  description: Joi.string().min(10).max(500).required().label("Description"),
  logo: Joi.string().min(0).max(200).label("Logo"),
  logoUpdate: Joi.string().min(0).max(200).label("Logo"),
  repository: Joi.string()
    .uri()
    .min(10)
    .max(200)
    .required()
    .label("Repository URL"),
  technologyBack: Joi.string()
    .min(3)
    .max(10)
    .required()
    .label("Back technology"),
  technologyFront: Joi.string()
    .min(3)
    .max(10)
    .required()
    .label("Front technology"),
});

export default projectSchema;

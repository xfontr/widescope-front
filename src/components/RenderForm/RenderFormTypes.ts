import Joi from "joi";

export interface RenderFormProps<T> {
  formType: FormComponents;
  errors: FormErrorsState;
  state: T;
  setter: React.Dispatch<React.SetStateAction<T>>;
  formData?: FormData;
}

export interface FormErrorsState {
  errors: Joi.ValidationErrorItem[];
  failedInputs: string[];
}

export type FormComponents =
  | "logIn"
  | "signUp"
  | "createProject"
  | "updateProject";

export type FormFields =
  | "name"
  | "password"
  | "repeatPassword"
  | "email"
  | "projectName"
  | "repository"
  | "logo"
  | "logoUpdate"
  | "technologyFront"
  | "technologyBack"
  | "description";

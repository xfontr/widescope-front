import Joi from "joi";
import { FormComponents } from "../../configs/allFormFields";

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

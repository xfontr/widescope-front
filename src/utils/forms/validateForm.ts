import Joi from "joi";
import React from "react";

export interface FormErrors {
  errors: Joi.ValidationErrorItem[];
  failedInputs: string[];
}

export interface FormValues {
  [key: string]: number | string;
}

export const validateForm = (
  schema: Joi.ObjectSchema,
  formValues: FormValues,
  setter: React.Dispatch<React.SetStateAction<FormErrors>>
): boolean => {
  const validation = schema.validate(formValues, { abortEarly: false });

  if (validation.error) {
    setter({
      errors: validation.error.details.map((failedInput) => failedInput),
      failedInputs: validation.error.details.map(
        (failedInput) => failedInput.path[0] as string
      ),
    });

    return false;
  }
  return true;
};

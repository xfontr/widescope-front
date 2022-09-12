import React from "react";
import { allFormFields, FormValue } from "../../configs/allFormFields";
import { GroupStyled, InputStyled, LabelStyled } from "./RenderFormStyled";
import createFormFrom from "../../utils/forms/createFormFrom";
import { RenderFormProps } from "./RenderFormTypes";

const handleChange = <T extends object>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  state: T,
  setter: React.Dispatch<React.SetStateAction<T>>,
  formData?: FormData
) => {
  setter({ ...state, [event.target.id]: event.target.value });

  event.target.type === "file" &&
    formData!.append(
      event.target.name,
      (event as React.ChangeEvent<HTMLInputElement>).target.files![0]
    );
};

const defineClass = (field: FormValue, errors: string[]) => {
  let className = "";

  if (errors.includes(field.name)) {
    className = "form__input--error";
  }

  if (field.customClass) {
    className += ` ${field.customClass}`;
  }

  return className;
};

const RenderForm = <T extends { [key: string]: string | number }>(
  props: RenderFormProps<T>
): JSX.Element => (
  <>
    {createFormFrom(props.formType, allFormFields).map((field) => (
      <GroupStyled className={field.customGroupClass}>
        <LabelStyled htmlFor={field.name}>{field.label}</LabelStyled>
        <InputStyled
          as={field.renderAs ? field.renderAs : "input"}
          type={field.type ? field.type : ""}
          placeholder={field.placeholder}
          id={field.name}
          name={field.name}
          className={defineClass(field, props.errors.failedInputs)}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleChange(event, props.state, props.setter, props.formData);
          }}
          value={props.state[field.name]}
        />
      </GroupStyled>
    ))}
  </>
);

export default RenderForm;

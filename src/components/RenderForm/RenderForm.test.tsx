import { render, screen } from "../../test-utils/render/customRender";
import createFormFrom from "../../utils/forms/createFormFrom";
import RenderForm from "./RenderForm";
import { FormErrorsState } from "./RenderFormTypes";
import { allFormFields } from "../../configs/allFormFields";
import { signFormInitialState } from "../SignForm/SignForm";
import userEvent from "@testing-library/user-event";

describe("Given a RenderForm component", () => {
  const errors = {
    errors: [],
    failedInputs: [],
  } as FormErrorsState;
  const setter = jest.fn() as React.Dispatch<React.SetStateAction<unknown>>;

  describe("When instantiated with a set of form fields", () => {
    test("Then it should render all the fields with its attributes an on change actions", () => {
      render(
        <RenderForm
          errors={errors}
          state={signFormInitialState}
          formType="logIn"
          setter={setter}
        />
      );

      const formFields = createFormFrom("logIn", allFormFields);

      const form = formFields.map((field) =>
        screen.getByLabelText(field.label)
      );

      form.forEach((field) => expect(field).toBeInTheDocument());
    });

    test("Then each field should have the value corresponding to the initial state", () => {
      const initialStateWithValues: typeof signFormInitialState = {
        name: "name",
        password: "password",
        repeatPassword: "password",
        email: "email",
      };

      render(
        <RenderForm
          errors={errors}
          state={initialStateWithValues}
          formType="logIn"
          setter={setter}
        />
      );

      const formFields = createFormFrom("logIn", allFormFields);

      const form = formFields.map(
        (field) => screen.getByLabelText(field.label) as HTMLInputElement
      );

      form.forEach((field, index) => {
        expect(field.value).toBe(Object.values(initialStateWithValues)[index]);
      });
    });
  });

  describe("When typing any of the fileds", () => {
    test("Then it should call the setter function", async () => {
      const typedText = "1";

      render(
        <RenderForm
          errors={errors}
          state={signFormInitialState}
          formType="logIn"
          setter={setter}
        />
      );

      const formFields = createFormFrom("logIn", allFormFields);

      const form = formFields.map(
        (field) => screen.getByLabelText(field.label) as HTMLInputElement
      );

      await form.reduce(async (previousPromise, element) => {
        await previousPromise;
        await userEvent.type(element, typedText);
        return Promise.resolve();
      }, Promise.resolve());

      expect(setter).toHaveBeenCalledTimes(form.length);
    });
  });
});

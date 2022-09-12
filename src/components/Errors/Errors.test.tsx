import loginSchema from "../../schemas/loginSchema";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import { FormErrors } from "../../utils/forms/validateForm";
import Errors from "./Errors";

describe("Given a Errors component", () => {
  describe("When instantiated with a list of errors", () => {
    const invalidValues = {
      name: mockUser.name,
      password: "",
    };

    const validation = loginSchema.validate(invalidValues, {
      abortEarly: false,
    });

    const errors = validation.error
      ? {
          errors: validation.error.details.map((failedInput) => failedInput),
          failedInputs: validation.error.details.map(
            (failedInput) => failedInput.path[0] as string
          ),
        }
      : ({} as FormErrors);
    test("Then it should display the errors", () => {
      render(<Errors errors={errors} />);

      const expectedPasswordError = screen.getByText(
        '"password" is not allowed to be empty'
      );

      expect(expectedPasswordError).toBeInTheDocument();
    });
  });

  describe("When instantiated with no errors", () => {
    const validValues = {
      name: mockUser.name,
      password: "admin12341234",
    };

    const validation = loginSchema.validate(validValues, {
      abortEarly: false,
    });

    const errors = validation.error
      ? {
          errors: validation.error.details.map((failedInput) => failedInput),
          failedInputs: validation.error.details.map(
            (failedInput) => failedInput.path[0] as string
          ),
        }
      : ({} as FormErrors);

    test("Then it should display nothing", () => {
      render(<Errors errors={errors} />);

      const unexpectedPasswordError = screen.queryByText(
        '"password" is not allowed to be empty'
      );

      expect(unexpectedPasswordError).not.toBeInTheDocument();
    });
  });
});

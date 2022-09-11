import loginSchema from "../../schemas/loginSchema";
import mockUser from "../../test-utils/mocks/mockUser";
import { FormErrors, validateForm } from "./validateForm";

describe("Given a validateForm function", () => {
  const setter = jest.fn() as React.Dispatch<React.SetStateAction<FormErrors>>;

  describe("When called with a validation schema, a set of values and a setter function", () => {
    test("Then it should return false if the values are not valid", () => {
      const expectedResult = false;
      const invalidValues = { name: "" };

      const result = validateForm(loginSchema, invalidValues, setter);

      expect(result).toBe(expectedResult);
    });

    test("Then it should return true if the values are valid", () => {
      const expectedResult = true;
      const validValues = { name: mockUser.name, password: "admin12341234" };

      const result = validateForm(loginSchema, validValues, setter);

      expect(result).toBe(expectedResult);
    });

    test("If the values are not valid, it should call the setter function with a set of errors", () => {
      const invalidValues = { name: "" };

      validateForm(loginSchema, invalidValues, setter);

      expect(setter).toHaveBeenCalled();

      const setterCalled = (setter as jest.Mock).mock.calls[0][0];

      expect(setterCalled).toHaveProperty("errors");
      expect(setterCalled).toHaveProperty("failedInputs");
    });

    test("If the values are valid, it should not call the setter function", () => {
      const validValues = { name: mockUser.name, password: "admin12341234" };

      validateForm(loginSchema, validValues, setter);

      expect(setter).not.toHaveBeenCalled();
    });
  });
});

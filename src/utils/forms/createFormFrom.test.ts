import { allFormFields } from "../../configs/allFormFields";
import createFormFrom from "./createFormFrom";

describe("Given a createFormFrom function", () => {
  describe("When called with a type of form and all the field types", () => {
    test("Then it should return an array of form fields that match the type of field", () => {
      const expectedResult = [
        {
          belongsTo: ["logIn", "signUp"],
          customClass: "form__input--user",
          label: "Name",
          name: "name",
          placeholder: "John Doe",
          type: "text",
        },
        {
          belongsTo: ["logIn", "signUp"],
          customClass: "form__input--password",
          label: "Password",
          name: "password",
          type: "password",
        },
      ];

      const result = createFormFrom("logIn", allFormFields);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

import { createEvent, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test-utils/render/customRender";
import SignForm from "./SignForm";

const mockSignUp = jest.fn();

jest.mock("../../hooks/useUser", () => () => ({
  signUp: mockSignUp,
}));

describe("Given a SignForm component", () => {
  describe("When instantiated as a login form", () => {
    test("Then it should show a name and a password input, plus a log in button", () => {
      render(<SignForm isLogin={true} />);

      const form = [
        screen.getByLabelText("Name"),
        screen.getByLabelText("Password"),
        screen.getByRole("button", { name: "Log in" }),
      ];

      const hiddenForm = [
        screen.queryByLabelText("Repeat password"),
        screen.queryByLabelText("Email address"),
      ];

      form.forEach((element) => expect(element).toBeInTheDocument());
      hiddenForm.forEach((element) => expect(element).not.toBeInTheDocument());
    });
  });

  describe("When instantiated as a sign up form", () => {
    test("Then it should show a name, two passwords and an email input, plus a sign up button", () => {
      render(<SignForm isLogin={false} />);

      const form = [
        screen.getByLabelText("Name"),
        screen.getByLabelText("Password"),
        screen.getByLabelText("Repeat password"),
        screen.getByLabelText("Email address"),
        screen.getByRole("button", { name: "Sign up" }),
      ];

      form.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated as a sign up form and when the user types in every field", () => {
    test("Then each field should have the typed value", async () => {
      const typedText = "hello@hello.com";
      render(<SignForm isLogin={false} />);

      const form = [
        screen.getByLabelText("Name") as HTMLInputElement,
        screen.getByLabelText("Password") as HTMLInputElement,
        screen.getByLabelText("Repeat password") as HTMLInputElement,
        screen.getByLabelText("Email address") as HTMLInputElement,
      ];

      await form.reduce(async (previousPromise, element) => {
        await previousPromise;
        await userEvent.type(element, typedText);
        return Promise.resolve();
      }, Promise.resolve());

      await form.forEach((element) => expect(element.value).toBe(typedText));
    });
  });

  describe("When instantiated as any type of form", () => {
    test("Then, on submit, it should be default prevented", () => {
      render(<SignForm isLogin={false} />);

      const form = screen.getByTestId("form");
      const submitEvent = createEvent.submit(form);

      fireEvent(form, submitEvent);

      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });

  describe("When instantiated as a sign up form and submitted with a valid user", () => {
    test("Then it should call the signUp function with the register data", async () => {
      const typedText = "hello@hello.com";
      render(<SignForm isLogin={false} />);

      const form = [
        screen.getByLabelText("Name") as HTMLInputElement,
        screen.getByLabelText("Password") as HTMLInputElement,
        screen.getByLabelText("Repeat password") as HTMLInputElement,
        screen.getByLabelText("Email address") as HTMLInputElement,
      ];

      await form.reduce(async (previousPromise, element) => {
        await previousPromise;
        await userEvent.type(element, typedText);
        return Promise.resolve();
      }, Promise.resolve());

      await form.forEach((element) => expect(element.value).toBe(typedText));

      const submitButton = screen.getByRole("button", { name: "Sign up" });
      await userEvent.click(submitButton);

      const signUpData = {
        name: form[0].value,
        password: form[1].value,
        email: form[3].value,
      };

      expect(mockSignUp).toHaveBeenCalledWith(signUpData);
    });
  });

  describe("When instantiated as a sign up form and submitted with an invalid user", () => {
    test("Then it should not call the signUp function", async () => {
      render(<SignForm isLogin={false} />);

      const submitButton = screen.getByRole("button", { name: "Sign up" });
      await userEvent.click(submitButton);

      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as a sign up form and submitted with not matching passwords", () => {
    test("Then it should not call the signUp function, and call it when they match", async () => {
      const falsePassword = "asdfasdfasdf";
      render(<SignForm isLogin={false} />);

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;
      const repeatPasswordInput = screen.getByLabelText(
        "Repeat password"
      ) as HTMLInputElement;
      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
      const emailInput = screen.getByLabelText(
        "Email address"
      ) as HTMLInputElement;

      await userEvent.type(nameInput, "asdfasdf");
      await userEvent.type(emailInput, "asdf@asdf.com");

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, "513415234344");

      const submitButton = screen.getByRole("button", { name: "Sign up" });
      await userEvent.click(submitButton);

      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as a sign up form and submitted with matching passwords", () => {
    test("Then it should call the signUp function", async () => {
      const falsePassword = "asdfasdfasdf";
      render(<SignForm isLogin={false} />);

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;
      const repeatPasswordInput = screen.getByLabelText(
        "Repeat password"
      ) as HTMLInputElement;
      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
      const emailInput = screen.getByLabelText(
        "Email address"
      ) as HTMLInputElement;

      await userEvent.type(nameInput, "asdfasdf");
      await userEvent.type(emailInput, "asdf@asdf.com");

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, falsePassword);

      const submitButton = screen.getByRole("button", { name: "Sign up" });
      await userEvent.click(submitButton);

      expect(mockSignUp).toHaveBeenCalled();
    });
  });

  describe("When instantiated as a sign up form and typed a wrong password in the repeat field", () => {
    test("Then it should change the style of the repeat field until a correct password is typed", async () => {
      const falsePassword = "asdfasdf";
      const expectedClassName = "form__input--error-repeat";
      render(<SignForm isLogin={false} />);

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;
      const repeatPasswordInput = screen.getByLabelText(
        "Repeat password"
      ) as HTMLInputElement;

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, "a");

      expect(repeatPasswordInput.className.includes(expectedClassName)).toBe(
        true
      );

      await userEvent.type(repeatPasswordInput, "sdfasdf");

      expect(repeatPasswordInput.className.includes(expectedClassName)).toBe(
        false
      );
    });

    test("Then it should change the style of the repeat field and bring it back to normal if it's empty", async () => {
      const falsePassword = "asdfasdf";
      const expectedClassName = "form__input--error-repeat";
      render(<SignForm isLogin={false} />);

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;
      const repeatPasswordInput = screen.getByLabelText(
        "Repeat password"
      ) as HTMLInputElement;

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, "a");

      expect(repeatPasswordInput.className.includes(expectedClassName)).toBe(
        true
      );

      fireEvent.change(repeatPasswordInput, { target: { value: "" } });

      expect(repeatPasswordInput.className.includes(expectedClassName)).toBe(
        false
      );
    });
  });
});

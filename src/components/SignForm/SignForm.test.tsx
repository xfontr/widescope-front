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
});

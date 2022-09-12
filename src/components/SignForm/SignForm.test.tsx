import { createEvent, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import { navRoutes } from "../../configs/routes";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, renderHook } from "../../test-utils/render/customRender";
import SignForm from "./SignForm";

const mockSignUp = jest.fn();
const mockLogIn = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  signUp: mockSignUp,
  logIn: mockLogIn,
}));

describe("Given a SignForm component", () => {
  describe("When instantiated as a login form", () => {
    test("Then it should show a name and a password input, plus a log in button", () => {
      render(<SignForm isLogin={true} />);

      const form = [
        screen.getByLabelText("Name"),
        screen.getByLabelText("Password"),
        screen.getByRole("button", { name: "Log in" }),
        screen.getByText("Don't have an account?"),
        screen.getByRole("link", { name: "Sign up for free" }),
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
      const typedText = mockUser.email;
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

    test("If the user submits but there are fields with invalid values, the fields styles should change", async () => {
      render(<SignForm isLogin={false} />);

      const submitButton = screen.getByRole("button", {
        name: "Sign up",
      });

      await userEvent.click(submitButton);

      const form = screen.getAllByRole("textbox");

      form.forEach((element) => {
        expect(element).toHaveStyle("border-color: rgb(179,120,120)");
        expect(element).toHaveStyle("border-width: 2px");
      });
    });

    test("If the user submit invalid values, a list of errors should appear", async () => {
      render(<SignForm isLogin={false} />);

      const submitButton = screen.getByRole("button", {
        name: "Sign up",
      });

      await userEvent.click(submitButton);

      const expectedPasswordError = screen.getByText(
        '"Password" is not allowed to be empty'
      );

      expect(expectedPasswordError).toBeInTheDocument();
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

      await userEvent.type(nameInput, mockUser.name);
      await userEvent.type(emailInput, mockUser.email);

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, "randomPassword123");

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

      await userEvent.type(nameInput, mockUser.name);
      await userEvent.type(emailInput, mockUser.email);

      await userEvent.type(passwordInput, falsePassword);
      await userEvent.type(repeatPasswordInput, falsePassword);

      const submitButton = screen.getByRole("button", { name: "Sign up" });
      await userEvent.click(submitButton);

      expect(mockSignUp).toHaveBeenCalled();
    });
  });

  describe("When instantiated as a log in form and submitted", () => {
    test("Then it should not call the sign up validations", async () => {
      render(<SignForm isLogin={true} />);

      const submitButton = screen.getByRole("button", { name: "Log in" });

      await userEvent.click(submitButton);
      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as a log in form and submitted with valid data", () => {
    test("Then it should call a log in function with the user login data", async () => {
      const expectedCalledWith = {
        name: mockUser.name,
        password: "mockPassword123",
      };

      render(<SignForm isLogin={true} />);

      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;

      await userEvent.type(nameInput, mockUser.name);
      await userEvent.type(passwordInput, "mockPassword123");

      const submitButton = screen.getByRole("button", { name: "Log in" });
      await userEvent.click(submitButton);

      expect(mockLogIn).toHaveBeenCalledWith(expectedCalledWith);
    });
  });

  describe("When instantiated as a log in form and submitted with invalid data", () => {
    test("Then it should no call the log in function", async () => {
      render(<SignForm isLogin={true} />);

      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;

      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;

      await userEvent.type(nameInput, "a");
      await userEvent.type(passwordInput, "a");

      const submitButton = screen.getByRole("button", { name: "Log in" });
      await userEvent.click(submitButton);

      expect(mockLogIn).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as a log in form and clicked 'Sign up for free'", () => {
    test(`Then it should redirect the user to ${navRoutes.signUp.path}`, async () => {
      render(<SignForm isLogin={true} />);

      const signUpLink = screen.getByRole("link", { name: "Sign up for free" });
      await userEvent.click(signUpLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.signUp.path);
    });
  });

  describe("When instantiated as a sign up form and clicked 'Log in'", () => {
    test(`Then it should redirect the user to ${navRoutes.logIn.path}`, async () => {
      render(<SignForm isLogin={false} />);

      const logInLink = screen.getByRole("link", { name: "Log in" });
      await userEvent.click(logInLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.logIn.path);
    });
  });
});

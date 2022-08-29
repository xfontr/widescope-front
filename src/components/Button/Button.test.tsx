import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  const buttonText = "hello";
  const buttonType = "button";

  describe("When instantiated", () => {
    test("Then it should show a button with the specified text", () => {
      render(<Button content={buttonText} type={buttonType} />);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When instantiated and clicked", () => {
    test("Then it should prevent its default action", () => {
      render(<Button content={buttonText} type={buttonType} />);

      const button = screen.getByRole("button", { name: buttonText });
      const clickEvent = createEvent.click(button);

      fireEvent(button, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(true);
    });

    test("Then it should call the function passed as props", () => {
      const action = jest.fn();
      render(<Button content={buttonText} type={buttonType} action={action} />);

      const button = screen.getByRole("button", { name: buttonText });
      fireEvent.click(button);

      expect(action).toHaveBeenCalled();
    });
  });
});

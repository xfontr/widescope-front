import { createEvent, fireEvent, screen } from "@testing-library/react";
import { render } from "../../test-utils/render/customRender";
import Button from "./Button";

describe("Given a Button component", () => {
  const buttonText = "hello";
  const buttonType = "button";

  describe("When instantiated", () => {
    test("Then it should show a button with the specified text", () => {
      render(<Button children={buttonText} type={buttonType} />);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When instantiated with an action and clicked", () => {
    test("Then it should prevent its default action", () => {
      const action = jest.fn();
      render(
        <Button children={buttonText} type={buttonType} action={action} />
      );

      const button = screen.getByRole("button", { name: buttonText });
      const clickEvent = createEvent.click(button);

      fireEvent(button, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(true);
    });

    test("Then it should call the function passed as props", () => {
      const action = jest.fn();
      render(
        <Button children={buttonText} type={buttonType} action={action} />
      );

      const button = screen.getByRole("button", { name: buttonText });
      fireEvent.click(button);

      expect(action).toHaveBeenCalled();
    });
  });

  describe("When instantiated without an action and clicked", () => {
    test("Then it should not prevent its default action", () => {
      render(<Button children={buttonText} type={buttonType} />);

      const button = screen.getByRole("button", { name: buttonText });
      const clickEvent = createEvent.click(button);

      fireEvent(button, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(false);
    });
  });

  describe("When instantiated as a link", () => {
    test("Then it should render as link instead of a button", () => {
      render(
        <Button
          children={buttonText}
          renderAs="a"
          link="https://www.google.com"
        />
      );

      const buttonLink = screen.getByRole("link", { name: buttonText });

      expect(buttonLink).toBeInTheDocument();
    });
  });
});

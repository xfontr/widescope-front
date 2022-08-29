import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../styles/styledMainTheme";
import Button from "./Button";

describe("Given a Button component", () => {
  const buttonText = "hello";
  const buttonType = "button";

  describe("When instantiated", () => {
    test("Then it should show a button with the specified text", () => {
      render(
        <ThemeProvider theme={styledMainTheme}>
          <Button content={buttonText} type={buttonType} />
        </ThemeProvider>
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When instantiated and clicked", () => {
    test("Then it should prevent its default action", () => {
      render(
        <ThemeProvider theme={styledMainTheme}>
          <Button content={buttonText} type={buttonType} />
        </ThemeProvider>
      );

      const button = screen.getByRole("button", { name: buttonText });
      const clickEvent = createEvent.click(button);

      fireEvent(button, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(true);
    });

    test("Then it should call the function passed as props", () => {
      const action = jest.fn();
      render(
        <ThemeProvider theme={styledMainTheme}>
          <Button content={buttonText} type={buttonType} action={action} />
        </ThemeProvider>
      );

      const button = screen.getByRole("button", { name: buttonText });
      fireEvent.click(button);

      expect(action).toHaveBeenCalled();
    });
  });
});

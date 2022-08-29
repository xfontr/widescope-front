import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../styles/styledMainTheme";
import App from "./App";

describe("Given an App component", () => {
  describe("When instantiated", () => {
    test("Then it should show a heading with the app name and a footer with the copyright", () => {
      const appName = "wideScope";
      const footerText = `wideScope © ${new Date().getFullYear()}`;

      render(
        <ThemeProvider theme={styledMainTheme}>
          <App />
        </ThemeProvider>
      );

      const heading = screen.getByRole("heading", { name: appName });
      const footer = screen.getByText(footerText);

      expect(heading).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });
});

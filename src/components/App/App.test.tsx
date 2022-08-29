import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render/customRender";
import App from "./App";

describe("Given an App component", () => {
  describe("When instantiated", () => {
    test("Then it should show a heading with the app name and a footer with the copyright", () => {
      const appName = "wideScope";
      const footerText = `wideScope © ${new Date().getFullYear()}`;

      render(<App />);

      const heading = screen.getByRole("heading", { name: appName });
      const footer = screen.getByText(footerText);

      expect(heading).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });
});

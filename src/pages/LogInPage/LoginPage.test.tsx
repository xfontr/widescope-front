import { render, screen } from "../../test-utils/render/customRender";
import LogInPage from "./LogInPage";

describe("Given a LoginUpPage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a sign up form", () => {
      render(<LogInPage />);

      const signUpHeading = screen.getByRole("heading", {
        name: "Log in",
        level: 3,
      });

      expect(signUpHeading).toBeInTheDocument();
    });
  });
});

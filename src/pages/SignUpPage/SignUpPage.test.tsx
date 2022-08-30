import { render, screen } from "../../test-utils/render/customRender";
import SignUpPage from "./SignUpPage";

describe("Given a SignUpPage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a sign up form", () => {
      render(<SignUpPage />);

      const signUpHeading = screen.getByRole("heading", {
        name: "Sign up",
        level: 3,
      });

      expect(signUpHeading).toBeInTheDocument();
    });
  });
});

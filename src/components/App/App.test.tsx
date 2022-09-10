import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { render } from "../../test-utils/render/customRender";
import App from "./App";

const mockGetToken = jest.fn();

jest.mock("../../hooks/useToken/useToken", () => () => mockGetToken);

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: "/",
  }),
}));

describe("Given an App component", () => {
  describe("When instantiated", () => {
    test("Then it should show a heading with the app name and a footer with the copyright", async () => {
      const appName = "wideScope";
      const footerText = `wideScope © ${new Date().getFullYear()}`;

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
        render(<App />);
      });

      const heading = screen.getByRole("heading", { name: appName });
      const footer = screen.getByText(footerText);

      expect(heading).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    test("Then it should call the getToken function", async () => {
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
        render(<App />);
      });

      expect(mockGetToken).toHaveBeenCalled();
    });
  });
});

import { render, screen } from "../../test-utils/render/customRender";
import userEvent from "@testing-library/user-event";
import NotFoundPage from "./NotFoundPage";
import { navRoutes } from "../../configs/routes";

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a NotFoundPage component", () => {
  describe("When instantiated", () => {
    test("Then it should display a not found message and a button", () => {
      render(<NotFoundPage />);

      const notFoundPage = [
        screen.getByRole("heading", {
          name: "Oops! We couldn't find what you are looking for",
          level: 2,
        }),
        screen.getByText("But hey, what about exploring some of our projects?"),
        screen.getByRole("button", { name: "Explore" }),
      ];

      notFoundPage.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });

    test("If the user clicks the 'Explore' button, it should call the navigate function", async () => {
      render(<NotFoundPage />);

      const button = screen.getByRole("button", { name: "Explore" });

      await userEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith(navRoutes.explore.path);
    });
  });
});

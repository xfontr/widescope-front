import { render as reactRender } from "@testing-library/react";
import { navRoutes } from "../../configs/routes";
import userEvent from "@testing-library/user-event";
import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import LandingPage from "./LandingPage";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a LandingPage component", () => {
  describe("When intantiated if the user is not logged", () => {
    test("Then it should show a hero section, a list of projects and a CTA to log in", async () => {
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
        render(<LandingPage />);
      });

      const landingPage = [
        screen.getByRole("heading", {
          name: "Let them know what you've got",
          level: 1,
        }),
        await screen.findByRole("heading", {
          name: "Start sharing your projects. It's free",
          level: 2,
        }),
        screen.getByText(
          "Set your projects to a new level by sharing them with wideScope's glowing community of developers."
        ),
        screen.getByText("Explore"),
        screen.getByText("Get started"),
      ];

      const projects = await screen.findAllByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      const loginForm = screen.getByText(
        "Share your latests projects with the WideScope community."
      );

      landingPage.forEach((element) => expect(element).toBeInTheDocument());
      projects.forEach((project) => expect(project).toBeInTheDocument());
      expect(loginForm).toBeInTheDocument();
    });
  });

  describe("When instantiated if the user is logged", () => {
    test("Then it should appear a create project CTA instead of the login form", () => {
      reactRender(<LandingPage />, { wrapper: WrapperWithMockStore });

      const ctaHeading = screen.getByRole("heading", {
        name: "Share your projects. It's free",
        level: 2,
      });
      const ctaButton = screen.getByText("Post a project");
      const loginForm = screen.queryByText(
        "Share your latests projects with the WideScope community."
      );

      expect(ctaHeading).toBeInTheDocument();
      expect(ctaButton).toBeInTheDocument();
      expect(loginForm).not.toBeInTheDocument();
    });

    test("Then the 'Post a project' button should send the user to the create page on click", async () => {
      reactRender(<LandingPage />, { wrapper: WrapperWithMockStore });

      const ctaButton = screen.getByText("Post a project");

      await userEvent.click(ctaButton);

      expect(mockNavigate).toHaveBeenCalledWith(navRoutes.createProject.path);
    });
  });

  describe("When instantiated", () => {
    test("If the user clicks the explore link, it should redirect to said page", async () => {
      reactRender(<LandingPage />, { wrapper: WrapperWithMockStore });

      const ctaButton = screen.getByText("Explore");

      await userEvent.click(ctaButton);

      expect(mockNavigate).toHaveBeenCalledWith(navRoutes.explore.path);
    });

    test("If the user clicks the Get started link, it should redirect to the sign up page", async () => {
      reactRender(<LandingPage />, { wrapper: WrapperWithMockStore });

      const ctaButton = screen.getByText("Get started");

      await userEvent.click(ctaButton);

      expect(mockNavigate).toHaveBeenCalledWith(navRoutes.signUp.path);
    });
  });
});

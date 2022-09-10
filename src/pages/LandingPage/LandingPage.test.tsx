import { render as reactRender } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import {
  findAllByRole,
  render,
  screen,
} from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import LandingPage from "./LandingPage";

describe("Given a LandingPage component", () => {
  describe("When intantiated if the user is not logged", () => {
    test("Then it should show a hero section, a list of projects and a CTA to log in", async () => {
      render(<LandingPage />);

      const landingPage = [
        screen.getByRole("heading", {
          name: "Let them know what you've got",
          level: 1,
        }),
        screen.getByRole("heading", {
          name: "Start sharing your projects. It's free",
          level: 2,
        }),
        screen.getByText(
          "Set your projects to a new level by sharing them with wideScope's glowing community of developers."
        ),
        screen.getByRole("button", { name: "Explore" }),
        screen.getByRole("button", { name: "Get started" }),
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
      const ctaButton = screen.getByRole("button", { name: "Post a project" });
      const loginForm = screen.queryByText(
        "Share your latests projects with the WideScope community."
      );

      expect(ctaHeading).toBeInTheDocument();
      expect(ctaButton).toBeInTheDocument();
      expect(loginForm).not.toBeInTheDocument();
    });
  });
});

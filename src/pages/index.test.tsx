import mockProject from "../test-utils/mocks/mockProject";
import { render, screen } from "../test-utils/render/customRender";
import { navRoutes } from "../configs/routes";

jest.mock("../sockets", () => ({
  open: () => undefined,
  on: () => jest.fn(),
  emit: () => jest.fn(),
}));

describe("Given a index module", () => {
  describe("When instantiated any of the lazy rendered components", () => {
    test("They should appear in the document", async () => {
      render(
        <>
          {Object.values(navRoutes).map(
            (route) => route.render && route.render()
          )}
        </>
      );

      const pages = [
        await screen.findByRole("heading", {
          name: "These are the latest projects",
        }),
        await screen.findByRole("heading", {
          name: "Sign up",
          level: 3,
        }),
        await screen.findByRole("heading", {
          name: "Oops! We couldn't find what you are looking for",
          level: 2,
        }),

        await screen.findByRole("heading", {
          name: "Your creations. Thanks for sharing!",
        }),

        await screen.findByRole("heading", {
          name: "Meet other authors",
        }),

        await screen.findByRole("heading", {
          name: "Let them know what you've got",
        }),
      ];

      const logInPage = await screen.findAllByRole("heading", {
        name: "Log in",
        level: 3,
      });

      const projectDetailsPage = await screen.findAllByRole("heading", {
        name: mockProject.name,
      });

      pages.forEach((element) => expect(element).toBeInTheDocument());
      expect(logInPage[0]).toBeInTheDocument();
      expect(projectDetailsPage[0]).toBeInTheDocument();
    });
  });
});

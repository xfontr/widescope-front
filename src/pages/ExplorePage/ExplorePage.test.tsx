import { render as reactRender } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import ExplorePage from "./ExplorePage";

describe("Given a ExplorePage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a title and the projects retreived", async () => {
      render(<ExplorePage />);

      const heading = screen.getByRole("heading", {
        name: "These are the latest projects",
      });

      const cards = await screen.findAllByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      expect(heading).toBeInTheDocument();
      expect(cards).toHaveLength(1);
    });
  });

  describe("When intantiated but no projects are found", () => {
    test("Then it should show a message 'No projects found.'", async () => {
      reactRender(<ExplorePage />, { wrapper: WrapperWithMockStore });

      const cards = screen.queryByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      const message = await screen.findByText("No projects found.");

      expect(cards).toBeNull();
      expect(message).toBeInTheDocument();
    });
  });
});

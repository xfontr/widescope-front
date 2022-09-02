import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import Projects from "./Projects";

describe("Given a Projects component", () => {
  describe("When instantiated with 2 projects as props", () => {
    test("Then it should show the passed projects", () => {
      const numberOfProjects = 2;
      render(
        <Projects projects={new Array(numberOfProjects).fill(mockProject)} />
      );

      const cards = screen.getAllByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      expect(cards).toHaveLength(numberOfProjects);
    });
  });
});

import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import Project from "./Project";

describe("Given a Project component", () => {
  describe("When instantiated with a project as props", () => {
    test("Then it should show the project main data", () => {
      render(<Project project={mockProject} />);

      const project = [
        screen.getByText(mockProject.author),
        screen.getByAltText(`${mockProject.name} logo`),
        screen.getByRole("heading", { name: mockProject.name, level: 3 }),
        screen.getByText(
          `${mockProject.technologies[0]
            .charAt(0)
            .toUpperCase()}${mockProject.technologies[0].slice(1)}`
        ),
        screen.getByText(
          `${mockProject.technologies[1]
            .charAt(0)
            .toUpperCase()}${mockProject.technologies[1].slice(1)}`
        ),
        screen.getByText(mockProject.description),
        screen.getByRole("button", { name: "View full project" }),
      ];

      project.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});

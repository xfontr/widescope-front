import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import ProjectDetails from "./ProjectDetails";

describe("Given a ProjectDetails component", () => {
  describe("When instantiated with a project as props", () => {
    test("Then it should show all the project details", () => {
      render(<ProjectDetails project={mockProject} />);

      const details = [
        screen.getByRole("heading", { name: mockProject.name, level: 2 }),
        screen.getByText(`developed by ${mockProject.author}`),
        screen.getByAltText(`${mockProject.name} logo`),
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
        screen.getByRole("heading", { name: "Built with", level: 3 }),
        screen.getByRole("heading", { name: "Description", level: 3 }),
        screen.getByRole("heading", { name: "Post date", level: 3 }),
        screen.getByRole("heading", {
          name: "You like how it sounds?",
          level: 3,
        }),
        screen.getByText(
          "See it yourself from the repository shared by the author"
        ),
        screen.getByRole("link", { name: "Take me to the code (free)" }),
      ];

      details.forEach((detail) => expect(detail).toBeInTheDocument());
    });
  });
});

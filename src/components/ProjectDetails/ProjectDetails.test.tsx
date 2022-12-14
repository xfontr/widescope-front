import mockProject from "../../test-utils/mocks/mockProject";
import {
  fireEvent,
  render,
  screen,
} from "../../test-utils/render/customRender";
import ProjectDetails from "./ProjectDetails";

const apiUrl = process.env.REACT_APP_API_URL;

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
    test("Then it should convert its date to yyyy/m/d and display it", () => {
      render(<ProjectDetails project={mockProject} />);

      const creationDate = [
        new Date(mockProject.creationDate).getFullYear(),
        new Date(mockProject.creationDate).getDate(),
        new Date(mockProject.creationDate).getMonth(),
      ].join("/");

      const date = screen.getByText(creationDate);

      expect(date).toBeInTheDocument();
    });
  });

  describe("When loading the project image", () => {
    test("The image source should be the project locally saved image", () => {
      render(<ProjectDetails project={mockProject} />);

      const image = screen.getByAltText(`${mockProject.name} logo`);

      expect(image.getAttribute("src")).toBe(`${apiUrl}/${mockProject.logo}`);
    });

    test("The image source should be the database one if the local one is not found", () => {
      render(<ProjectDetails project={mockProject} />);

      const image = screen.getByAltText(`${mockProject.name} logo`);
      fireEvent.error(image);

      expect(image.getAttribute("src")).toBe(
        `${mockProject.logoBackup.slice(0, -mockProject.logo.length)}${
          mockProject.logo
        }`
      );
    });

    test("The image should not keep trying to change its source after the first try", () => {
      render(<ProjectDetails project={mockProject} />);

      const image = screen.getByAltText(`${mockProject.name} logo`);
      fireEvent.error(image);

      expect(image.getAttribute("src")).toBe(
        `${mockProject.logoBackup.slice(0, -mockProject.logo.length)}${
          mockProject.logo
        }`
      );

      fireEvent.error(image);

      expect(image.getAttribute("src")).toBe(
        `${mockProject.logoBackup.slice(0, -mockProject.logo.length)}${
          mockProject.logo
        }`
      );
    });
  });
});

import userEvent from "@testing-library/user-event";
import { filterInitialState } from "../../pages/ExplorePage/ExplorePage";
import mockProject from "../../test-utils/mocks/mockProject";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../test-utils/render/customRender";
import { Filter } from "../../types/filter";
import Project from "./Project";

const apiUrl = process.env.REACT_APP_API_URL;

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockDeleteProject = jest.fn();

jest.mock("../../hooks/useProjects/useProjects", () => () => ({
  deleteProject: mockDeleteProject,
}));

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
        screen.getByText("View full project"),
      ];

      project.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When clicking the view full project button", () => {
    test("Then it should send the user to the details page", async () => {
      render(<Project project={mockProject} />);

      const viewDetailsButton = screen.getByText("View full project");

      await userEvent.click(viewDetailsButton);

      expect(mockNavigate).toHaveBeenCalledWith(`/project/${mockProject.id}`);
    });
  });

  describe("When instantiated with a useState setter and clicked the author tag", () => {
    test("Then it should call the setter function with a filter object", async () => {
      const mockUseState = jest.fn() as React.Dispatch<
        React.SetStateAction<Filter>
      >;

      render(<Project project={mockProject} setFilter={mockUseState} />);

      const authorTag = screen.getByText(mockProject.author);
      await userEvent.click(authorTag);

      expect(mockUseState).toHaveBeenCalledWith({
        ...filterInitialState,
        filter: "byAuthor",
        byAuthor: { id: mockProject.authorId, name: mockProject.author },
      });
    });
  });

  describe("When instantiated with a useState setter and clicket a technology tag", () => {
    test("Then it should call the setter function with a filter by technology", async () => {
      const mockUseState = jest.fn() as React.Dispatch<
        React.SetStateAction<Filter>
      >;

      render(<Project project={mockProject} setFilter={mockUseState} />);

      const technologyTag = screen.getByText(mockProject.technologies[0]);
      await userEvent.click(technologyTag);

      expect(mockUseState).toHaveBeenCalledWith({
        ...filterInitialState,
        filter: "byTechnology",
        byTechnology: mockProject.technologies[0],
      });
    });
  });

  describe("When instantiated as not readOnly", () => {
    test("Then it should also show a delete button", () => {
      render(<Project project={mockProject} isReadOnly={false} />);

      const deleteButton = screen.getByRole("button", {
        name: "delete",
      });

      expect(deleteButton).toBeInTheDocument();
    });

    test("Then, on clicking the delete button, a delete function should be called with the project id", async () => {
      render(<Project project={mockProject} isReadOnly={false} />);

      const deleteButton = screen.getByRole("button", {
        name: "delete",
      });

      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockDeleteProject).toHaveBeenCalledWith(mockProject.id);
      });
    });

    test("Then, on clicking the update button, it should navigate to the update page", async () => {
      render(<Project project={mockProject} isReadOnly={false} />);

      const updateButton = screen.getByRole("button", {
        name: "update",
      });

      await userEvent.click(updateButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          `/projects/update/${mockProject.id}`
        );
      });
    });
  });

  describe("When loading the project image", () => {
    test("The image source should be the project locally saved image", () => {
      render(<Project project={mockProject} isReadOnly={false} />);

      const image = screen.getByAltText(`${mockProject.name} logo`);

      expect(image.getAttribute("src")).toBe(
        `${apiUrl}/uploads/r_${mockProject.logo}`
      );
    });

    test("The image source should be the database one if the local one is not found", () => {
      render(<Project project={mockProject} isReadOnly={false} />);

      const image = screen.getByAltText(`${mockProject.name} logo`);
      fireEvent.error(image);

      expect(image.getAttribute("src")).toBe(
        `${mockProject.logoBackup.slice(0, -mockProject.logo.length)}r_${
          mockProject.logo
        }`
      );
    });
  });
});

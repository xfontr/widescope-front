import userEvent from "@testing-library/user-event";
import { useState } from "react";
import mockProject from "../../test-utils/mocks/mockProject";
import {
  render,
  renderHook,
  screen,
} from "../../test-utils/render/customRender";
import { Filter } from "../../types/filter";
import Project from "./Project";

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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
        screen.getByRole("button", { name: "View full project" }),
      ];

      project.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When clicking the view full project button", () => {
    test("Then it should send the user to the details page", async () => {
      render(<Project project={mockProject} />);

      const viewDetailsButton = screen.getByRole("button", {
        name: "View full project",
      });

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
        filter: "byAuthor",
        byAuthor: { id: mockProject.authorId, name: mockProject.author },
      });
    });
  });
});

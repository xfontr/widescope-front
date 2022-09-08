import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import ProjectDetailsPage from "./ProjectDetailsPage";

let mockProjectId = mockProject.id;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ projectId: mockProjectId }),
}));

describe("Given a ProjectDetailsPage component", () => {
  describe("When instantiated with a valid param", () => {
    test("Then it should get a project and display it", async () => {
      render(<ProjectDetailsPage />);

      const projectTitle = await screen.findByRole("heading", {
        name: mockProject.name,
      });

      expect(projectTitle).toBeInTheDocument();
    });
  });

  describe("When instantiated with an invalid param", () => {
    test("Then it should display a not found message", async () => {
      mockProjectId = "falseId";

      render(<ProjectDetailsPage />);

      const projectTitle = screen.queryByRole("heading", {
        name: mockProject.name,
      });

      const notFoundMessage = screen.getByText("Project not found.");

      expect(projectTitle).not.toBeInTheDocument();
      expect(notFoundMessage).toBeInTheDocument();
    });
  });
});

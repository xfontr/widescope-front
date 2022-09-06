import { render, screen } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import ManageProjectPage from "./ManageProjectPage";

let mockProjectId = mockProject.id;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ projectId: mockProjectId }),
}));

describe("Given a ManageProjectPage component", () => {
  describe("When instantiated as a create project page", () => {
    test("Then it should show a title and the create a project form", () => {
      render(<ManageProjectPage isCreate={true} />, {
        wrapper: WrapperWithMockStore,
      });

      const page = [
        screen.getByRole("heading", { name: "New project", level: 2 }),
        screen.getByRole("heading", {
          name: "Tell us about your project",
          level: 3,
        }),
      ];

      page.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated as a update project page", () => {
    test("Then it should show a title and the create a project form", () => {
      render(<ManageProjectPage isCreate={false} />, {
        wrapper: WrapperWithMockStore,
      });

      const page = [
        screen.getByRole("heading", { name: "Update project", level: 2 }),
        screen.getByRole("heading", {
          name: `Update ${mockProject.name}`,
          level: 3,
        }),
      ];

      page.forEach((element) => expect(element).toBeInTheDocument());
    });

    test("Then it should show a loading message if the project is not found yet", () => {
      mockProjectId = "";

      render(<ManageProjectPage isCreate={false} />, {
        wrapper: WrapperWithMockStore,
      });

      const loadingMessage = screen.getByText(
        "Loading the requested project..."
      );

      expect(loadingMessage).toBeInTheDocument();
    });
  });
});

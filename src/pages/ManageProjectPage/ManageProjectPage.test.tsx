import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import ManageProjectPage from "./ManageProjectPage";

describe("Given a ManageProjectPage component", () => {
  describe("When instantiated as a create project page", () => {
    test("Then it should show a title and the create a project form", () => {
      render(<ManageProjectPage isCreate={true} />);

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
      render(<ManageProjectPage isCreate={false} />);

      const page = [
        screen.getByRole("heading", { name: "Update project", level: 2 }),
        screen.getByRole("heading", {
          name: `Update ${mockProject.name}`,
          level: 3,
        }),
      ];

      page.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});

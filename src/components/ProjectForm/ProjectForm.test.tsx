import { render, screen } from "../../test-utils/render/customRender";
import ProjectForm from "./ProjectForm";

describe("Given a ProjectForm component", () => {
  describe("When instantiated as a create form", () => {
    test("Then it should show all the inputs to create a project", () => {
      render(<ProjectForm isCreate={true} />);

      const form = [
        screen.getByRole("heading", {
          name: "Tell us about your project",
          level: 3,
        }),
        screen.getByLabelText("Name"),
        screen.getByLabelText("Repository URL"),
        screen.getByLabelText("Project logo"),
        screen.getByLabelText("Frontend main library or framework"),
        screen.getByLabelText("Backend main library or framework"),
        screen.getByLabelText("Description"),
        screen.getByRole("button", { name: "Create project" }),
      ];

      form.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated as an update form", () => {
    test("Then it should show all the inputs of the create form, but different title and button text", () => {
      render(<ProjectForm isCreate={false} />);

      const form = [
        screen.getByRole("heading", {
          name: "Update your project",
          level: 3,
        }),
        screen.getByRole("button", { name: "Update project" }),
      ];

      form.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});

import userEvent from "@testing-library/user-event";
import mockProject from "../../test-utils/mocks/mockProject";
import {
  createEvent,
  fireEvent,
  render,
  screen,
} from "../../test-utils/render/customRender";
import ProjectForm from "./ProjectForm";

const mockFile = new File([""], "");

const mockCreate = jest.fn();

jest.mock("../../hooks/useProjects/useProjects", () => () => ({
  ...jest.requireActual("../../hooks/useProjects/useProjects"),
  create: mockCreate,
}));

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

  describe("When instantiated as any sort of form", () => {
    test("Then the user should be able to type values to the input fields", async () => {
      const typedText = mockProject.name;
      render(<ProjectForm isCreate={true} />);

      const form = [
        screen.getByLabelText("Name") as HTMLInputElement,
        screen.getByLabelText("Repository URL") as HTMLInputElement,
        screen.getByLabelText(
          "Frontend main library or framework"
        ) as HTMLInputElement,
        screen.getByLabelText(
          "Backend main library or framework"
        ) as HTMLInputElement,
        screen.getByLabelText("Description") as HTMLInputElement,
      ];

      form.forEach((element) => {
        fireEvent.change(element, { target: { value: typedText } });
      });

      form.forEach((element) => expect(element.value).toBe(typedText));
    });

    test("Then if the user sets a file, it should be appended to the form data", async () => {
      render(<ProjectForm isCreate={true} />);

      const inputFile = screen.getByLabelText(
        "Project logo"
      ) as HTMLInputElement;
      await userEvent.upload(inputFile, mockFile);

      expect(inputFile.value).toBe("C:\\fakepath\\");
    });

    test("If the user submits, the default action of submit should be prevented", () => {
      render(<ProjectForm isCreate={true} />);

      const form = screen.getByTestId("form");
      const submitEvent = createEvent.submit(form);

      fireEvent(form, submitEvent);

      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });

  describe("When submitted as a create form", () => {
    test("Then it should call the create function with the form data", async () => {
      render(<ProjectForm isCreate={true} />);
      const typedText = mockProject.name;

      const form = [
        screen.getByLabelText("Name") as HTMLInputElement,
        screen.getByLabelText("Repository URL") as HTMLInputElement,
        screen.getByLabelText(
          "Frontend main library or framework"
        ) as HTMLInputElement,
        screen.getByLabelText(
          "Backend main library or framework"
        ) as HTMLInputElement,
        screen.getByLabelText("Description") as HTMLInputElement,
      ];

      form.forEach((element) => {
        fireEvent.change(element, { target: { value: typedText } });
      });

      const inputFile = screen.getByLabelText(
        "Project logo"
      ) as HTMLInputElement;
      await userEvent.upload(inputFile, mockFile);

      const submitButton = screen.getByRole("button", {
        name: "Create project",
      });

      await userEvent.click(submitButton);

      expect(mockCreate).toHaveBeenCalled();
    });
  });
});

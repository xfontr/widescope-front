import userEvent from "@testing-library/user-event";
import { navRoutes } from "../../configs/routes";
import mockProject from "../../test-utils/mocks/mockProject";
import {
  createEvent,
  fireEvent,
  render,
  screen,
} from "../../test-utils/render/customRender";
import ProjectForm from "./ProjectForm";

const mockFile = new File([""], mockProject.logo);

const mockCreate = jest.fn();
const mockUpdate = jest.fn();

jest.mock("../../hooks/useProjects/useProjects", () => () => ({
  ...jest.requireActual("../../hooks/useProjects/useProjects"),
  create: mockCreate,
  update: mockUpdate,
}));

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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
      render(<ProjectForm isCreate={false} project={mockProject} />);

      const form = [
        screen.getByRole("heading", {
          name: `Update ${mockProject.name}`,
          level: 3,
        }),
        screen.getByRole("button", { name: "Update project" }),
      ];

      form.forEach((element) => expect(element).toBeInTheDocument());
    });

    test("Then the fields should be filled with the project details", () => {
      render(<ProjectForm isCreate={false} project={mockProject} />);

      const formValues = {
        name: (screen.getByLabelText("Name") as HTMLInputElement).value,
        repository: (
          screen.getByLabelText("Repository URL") as HTMLInputElement
        ).value,
        technologies: [
          (
            screen.getByLabelText(
              "Frontend main library or framework"
            ) as HTMLInputElement
          ).value,
          (
            screen.getByLabelText(
              "Backend main library or framework"
            ) as HTMLInputElement
          ).value,
        ],
        description: (screen.getByLabelText("Description") as HTMLInputElement)
          .value,
      };

      expect(formValues.name).toBe(mockProject.name);
      expect(formValues.repository).toBe(mockProject.repository);
      expect(formValues.technologies).toEqual(mockProject.technologies);
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

      expect(inputFile.value).toBe(`C:\\fakepath\\${mockProject.logo}`);
    });

    test("If the user submits, the default action of submit should be prevented", () => {
      render(<ProjectForm isCreate={true} />);

      const form = screen.getByTestId("form");
      const submitEvent = createEvent.submit(form);

      fireEvent(form, submitEvent);

      expect(submitEvent.defaultPrevented).toBe(true);
    });

    test("If the user submits but there are fields with invalid values, the fields styles should change", async () => {
      render(<ProjectForm isCreate={true} />);

      const submitButton = screen.getByRole("button", {
        name: "Create project",
      });

      await userEvent.click(submitButton);

      const form = screen.getAllByRole("textbox");

      form.forEach((element) => {
        expect(element).toHaveStyle("border-color: rgb(179,120,120)");
        expect(element).toHaveStyle("border-width: 2px");
      });
    });

    test("If the user submit invalid values, a list of errors should appear", async () => {
      render(<ProjectForm isCreate={true} />);

      const submitButton = screen.getByRole("button", {
        name: "Create project",
      });

      await userEvent.click(submitButton);

      const errorMessage = screen.getByText(
        '"name" is not allowed to be empty'
      );

      expect(errorMessage).toBeInTheDocument();
    });

    test("If the user submits, the fields should be emptied, the errors restored and sent back to the list", async () => {
      render(<ProjectForm isCreate={true} />);
      const typedText = mockProject.name;

      const form = screen.getAllByRole("textbox");

      await form.reduce(async (previousPromise, element) => {
        await previousPromise;
        await userEvent.type(element, typedText);
        return Promise.resolve();
      }, Promise.resolve());

      const inputFile = screen.getByLabelText(
        "Project logo"
      ) as HTMLInputElement;
      await userEvent.upload(inputFile, mockFile);

      const submitButton = screen.getByRole("button", {
        name: "Create project",
      });

      await userEvent.click(submitButton);

      form.forEach((element) => expect(element).toHaveValue(""));

      form.forEach((element) => {
        expect(element).not.toHaveStyle("border-color: rgb(179,120,120)");
      });

      expect(mockNavigate).toHaveBeenCalledWith(
        navRoutes.personalProjects.path
      );
    });
  });

  describe("When submitted as a create form", () => {
    test("Then it should call the create function with the form data", async () => {
      render(<ProjectForm isCreate={true} />);
      const typedText = mockProject.name;

      const form = screen.getAllByRole("textbox");

      await form.reduce(async (previousPromise, element) => {
        await previousPromise;
        await userEvent.type(element, typedText);
        return Promise.resolve();
      }, Promise.resolve());

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

    test("Then it should not call the create function if there's an empty required field", async () => {
      render(<ProjectForm isCreate={true} />);

      const submitButton = screen.getByRole("button", {
        name: "Create project",
      });

      await userEvent.click(submitButton);

      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  describe("When submitted as a update form", () => {
    test("Then it should call the create function with the form data", async () => {
      render(<ProjectForm isCreate={false} project={mockProject} />);

      const inputFile = screen.getByLabelText(
        "Project logo"
      ) as HTMLInputElement;
      await userEvent.upload(inputFile, mockFile);

      const submitButton = screen.getByRole("button", {
        name: "Update project",
      });

      await userEvent.click(submitButton);

      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});

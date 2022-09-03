import { render, screen } from "../../test-utils/render/customRender";
import CreateProjectPage from "./CreateProjectPage";

describe("Given a CreateProjectPage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a title and the create a project form", () => {
      render(<CreateProjectPage />);

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
});

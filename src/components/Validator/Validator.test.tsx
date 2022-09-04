import { render as reactRender, screen } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { render } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import Project from "../Project/Project";
import Validator from "./Validator";

describe("Given a validator component", () => {
  describe("When instantiated with another component as a child", () => {
    test("Then it should render the component if the user is logged", () => {
      reactRender(
        <Validator>
          <Project project={mockProject} />
        </Validator>,
        { wrapper: WrapperWithMockStore }
      );

      const projectName = screen.getByText(mockProject.name);

      expect(projectName).toBeInTheDocument();
    });

    test("Then it should not render the component if the user is not logged", () => {
      render(
        <Validator>
          <Project project={mockProject} />
        </Validator>
      );

      const projectName = screen.queryByText(mockProject.name);

      expect(projectName).not.toBeInTheDocument();
    });
  });
});

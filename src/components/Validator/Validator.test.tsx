import { render as reactRender, screen } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { render } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import Button from "../Button/Button";
import Project from "../Project/Project";
import Validator from "./Validator";

const mockGetToken = jest.fn();

jest.mock("../../hooks/useToken/useToken", () => () => mockGetToken);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => {
    const MockComponent = ({ to }: { to: string }): JSX.Element => (
      <button>{to}</button>
    );
    return <MockComponent to={""} />;
  },
}));

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
          <Button content="Hello" type="button" />
        </Validator>
      );

      const button = screen.queryByRole("button", { name: "Hello" });

      expect(button).not.toBeInTheDocument();
    });

    test("Then it should call the getToken function if the token hasn't been loaded yet", () => {
      render(
        <Validator>
          <Button content="Hello" type="button" />
        </Validator>
      );

      expect(mockGetToken).toHaveBeenCalled();
    });
  });
});

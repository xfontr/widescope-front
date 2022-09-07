import { render as reactRender, screen } from "@testing-library/react";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import Validator from "./Validator";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => {
    const MockNavigate = (): JSX.Element => <>Navigate</>;
    return <MockNavigate />;
  },
  Outlet: () => {
    const MockOutlet = (): JSX.Element => <>Outlet</>;
    return <MockOutlet />;
  },
}));

describe("Given a Validator component", () => {
  describe("When instantiated with option as true", () => {
    test("Then it should render the Outlet, which will render a component passed by the router", () => {
      reactRender(<Validator option={true} />, {
        wrapper: WrapperWithMockStore,
      });

      const Outlet = screen.getByText("Outlet");

      expect(Outlet).toBeInTheDocument();
    });

    describe("When instantiated with option as false", () => {
      test("Then it should render the Navigate, which will send the user to the specified route", () => {
        reactRender(<Validator option={false} />, {
          wrapper: WrapperWithMockStore,
        });

        const Navigate = screen.getByText("Navigate");

        expect(Navigate).toBeInTheDocument();
      });
    });
  });
});

import { render, screen } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import ManageProjectPage from "./ManageProjectPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import styledMainTheme from "../../styles/styledMainTheme";
import { store } from "../../app/store";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";

let mockProjectId = mockProject.id;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ projectId: mockProjectId }),
}));

describe("Given a ManageProjectPage component", () => {
  describe("When instantiated as a create project page", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <ManageProjectPage isCreate={true} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

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
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <ManageProjectPage isCreate={false} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

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

import { act } from "react-dom/test-utils";
import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import ProjectDetailsPage from "./ProjectDetailsPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../styles/styledMainTheme";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";

let mockProjectId = mockProject.id;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ projectId: mockProjectId }),
}));

describe("Given a ProjectDetailsPage component", () => {
  describe("When instantiated with a valid param", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <ProjectDetailsPage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

    test("Then it should get a project and display it", async () => {
      await render(<ProjectDetailsPage />);

      const projectTitle = await screen.findByRole("heading", {
        name: mockProject.name,
      });

      expect(projectTitle).toBeInTheDocument();
    });
  });

  describe("When instantiated with an invalid param", () => {
    test("Then it should display a not found message", async () => {
      mockProjectId = "falseId";

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
        render(<ProjectDetailsPage />);
      });

      const projectTitle = screen.queryByRole("heading", {
        name: mockProject.name,
      });

      const notFoundMessage = screen.getByText("Project not found.");

      expect(projectTitle).not.toBeInTheDocument();
      expect(notFoundMessage).toBeInTheDocument();
    });
  });
});

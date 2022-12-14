import { render as reactRender } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import UserProjectsPage from "./UserProjectsPage";
import renderer from "react-test-renderer";
import GlobalStyles from "../../styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import styledMainTheme from "../../styles/styledMainTheme";

describe("Given a UserProjectsPage component", () => {
  describe("When instantiated", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <UserProjectsPage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

    test("Then it should show a title and the projects retreived", async () => {
      reactRender(<UserProjectsPage />, { wrapper: WrapperWithMockStore });

      const heading = screen.getByRole("heading", {
        name: "Your creations. Thanks for sharing!",
      });

      const cards = await screen.findAllByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      expect(heading).toBeInTheDocument();
      expect(cards).toHaveLength(1);
    });

    test("Then it should instantiate the projects as not read only", () => {
      reactRender(<UserProjectsPage />, {
        wrapper: WrapperWithMockStore,
      });

      const deleteButton = screen.getByRole("button", { name: "delete" });

      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("When intantiated but no projects are found or the user is not logged in", () => {
    test("Then it should show a message 'No projects found.'", async () => {
      render(<UserProjectsPage />);

      const cards = screen.queryByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      const message = await screen.findByText(
        "You don't seem to have any project up. What about sharing one of your works?"
      );

      expect(cards).toBeNull();
      expect(message).toBeInTheDocument();
    });
  });
});

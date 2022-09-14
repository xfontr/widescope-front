import { render, screen } from "../../test-utils/render/customRender";
import LogInPage from "./LogInPage";
import renderer from "react-test-renderer";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";
import styledMainTheme from "../../styles/styledMainTheme";

describe("Given a LoginUpPage component", () => {
  describe("When instantiated", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <LogInPage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

    test("Then it should show a sign up form", () => {
      render(<LogInPage />);

      const signUpHeading = screen.getByRole("heading", {
        name: "Log in",
        level: 3,
      });

      expect(signUpHeading).toBeInTheDocument();
    });
  });
});

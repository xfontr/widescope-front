import { render, screen } from "../../test-utils/render/customRender";
import SignUpPage from "./SignUpPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";
import { store } from "../../app/store";
import styledMainTheme from "../../styles/styledMainTheme";

describe("Given a SignUpPage component", () => {
  describe("When instantiated", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <SignUpPage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

    test("Then it should show a sign up form", () => {
      render(<SignUpPage />);

      const signUpHeading = screen.getByRole("heading", {
        name: "Sign up",
        level: 3,
      });

      expect(signUpHeading).toBeInTheDocument();
    });
  });
});

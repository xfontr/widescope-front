import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { store } from "../../app/store";
import GlobalStyles from "../../styles/GlobalStyles";
import styledMainTheme from "../../styles/styledMainTheme";
import mockStore from "../mocks/mockStore";

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyles />
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

const WrapperWithMockStore = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <Provider store={mockStore}>
        <BrowserRouter>
          <GlobalStyles />
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export { Wrapper, WrapperWithMockStore };

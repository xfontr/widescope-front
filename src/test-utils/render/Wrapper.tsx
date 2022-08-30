import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { store } from "../../app/store";
import GlobalStyles from "../../styles/GlobalStyles";
import styledMainTheme from "../../styles/styledMainTheme";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
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

export default Wrapper;

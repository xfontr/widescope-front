import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import styledMainTheme from "../../styles/styledMainTheme";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Wrapper;

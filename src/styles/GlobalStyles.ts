import { createGlobalStyle } from "styled-components";
import styledMainTheme from "./styledMainTheme";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background-color: ${styledMainTheme.colors.primaryDarker};
    font-family: manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button, input {
    font: inherit;
    border: none;
  }
`;

export default GlobalStyles;

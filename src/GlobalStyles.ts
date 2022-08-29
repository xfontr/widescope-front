import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
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

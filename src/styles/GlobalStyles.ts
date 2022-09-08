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
    outline: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  .page{
  
  &__title{
    font-size: 2.8rem;
    font-weight: normal;

    &--bold {
      font-weight: bold;
    }
    
    @media (min-width: ${styledMainTheme.breakpoints.large}) {
      max-width: 30%;

    &--wide {
      max-width: 60%;
    }
    }

    &-subheading {
      display: block;
      margin-bottom: ${styledMainTheme.spacing.paddingSmall};
    }
  }

  &-container {
    background-color: ${styledMainTheme.colors.primary};
    border-radius: ${styledMainTheme.shapes.radiusSmall};
    padding: ${styledMainTheme.spacing.paddingBig};
  }

  &__breadcrumbs {
    color: ${styledMainTheme.colors.secondaryBrigther};
    margin-bottom: -1.6rem;
    margin-top: 1.6rem;
    display: block;
    letter-spacing: 0.2px;
    font-weight: bold;
    cursor: pointer;
  }
}
`;

export default GlobalStyles;

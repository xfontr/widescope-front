import styled from "styled-components";

const AppStyled = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing.paddingSmall};
  padding-bottom: 2.5rem;

  max-width: ${(props) => props.theme.breakpoints.verySmall};
  margin: 0 auto;

  @media (min-width: ${(props) => props.theme.breakpoints.verySmall}) {
    max-width: ${(props) => props.theme.breakpoints.big};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.big}) {
    max-width: ${(props) => props.theme.breakpoints.large};
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 5rem;

    &__title {
      font-size: 1.3rem;
    }
  }

  .footer {
    position: absolute;
    min-height: 9rem;
    display: flex;
    align-items: center;

    &__copyright {
      padding-top: 2rem;
      display: block;
      color: ${(props) => props.theme.colors.secondaryBrigther};
    }
  }
`;

export default AppStyled;

import styled from "styled-components";

const AppStyled = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing.paddingSmall};
  padding-bottom: 2.5rem;

  max-width: ${(props) => props.theme.breakpoints.small};
  margin: 0 auto;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
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
  }

  .footer {
    position: absolute;
    min-height: 2.5rem;

    &__copyright {
      display: block;
      padding-top: 2rem;
    }
  }
`;

export default AppStyled;

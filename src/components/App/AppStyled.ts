import styled from "styled-components";

const AppStyled = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing.paddingSmall};

  max-width: ${(props) => props.theme.breakpoints.small};
  margin: 0 auto;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    max-width: ${(props) => props.theme.breakpoints.big};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.big}) {
    max-width: ${(props) => props.theme.breakpoints.large};
  }
`;

export default AppStyled;

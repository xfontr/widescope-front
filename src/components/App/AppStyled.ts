import styled from "styled-components";

const AppStyled = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.paddingSmall};
  padding-bottom: 2.5rem;

  max-width: ${({ theme }) => theme.breakpoints.verySmall};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.verySmall}) {
    max-width: ${({ theme }) => theme.breakpoints.big};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.big}) {
    max-width: ${({ theme }) => theme.breakpoints.large};
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 5rem;

    &__title {
      font-size: 1.3rem;
      position: relative;
      z-index: 999;
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
      color: ${({ theme }) => theme.colors.secondaryBrigther};
    }
  }
`;

export default AppStyled;

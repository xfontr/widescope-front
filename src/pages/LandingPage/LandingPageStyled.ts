import styled from "styled-components";

export const HeroSectionStyled = styled.section`
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/img/background.jpeg");

  background-attachment: fixed;
  background-position: top left;
  margin-top: -12.4vh;
  margin-bottom: -10vh;
  padding: 14vh 0 20vh 1.4rem;

  .container {
    max-width: ${(props) => props.theme.breakpoints.verySmall};
    margin: 0 auto;

    @media (min-width: ${(props) => props.theme.breakpoints.verySmall}) {
      max-width: ${(props) => props.theme.breakpoints.big};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.big}) {
      max-width: ${(props) => props.theme.breakpoints.large};
    }
  }

  &:first-child a {
    margin-right: ${({ theme }) => theme.spacing.gapSmall};
  }

  .page__title {
    &--landing {
      font-size: clamp(3.5rem, 5.5vw, 7rem);
      line-height: 4rem;
      margin-bottom: ${({ theme }) => theme.spacing.gapBig};

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        max-width: 70%;
      }
    }

    &-subheading--landing {
      font-size: 1.3rem;
      margin-bottom: ${({ theme }) => theme.spacing.gapBig};

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        max-width: 40%;
      }
    }
  }
`;

export const CTASectionStyled = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: 5rem;
  padding-top: 1rem;
  padding-bottom: 5rem;
  color: ${({ theme }) => theme.colors.primary};

  .container {
    padding: 1.4rem;
    max-width: ${(props) => props.theme.breakpoints.verySmall};
    margin: 0 auto;

    @media (min-width: ${(props) => props.theme.breakpoints.verySmall}) {
      max-width: ${(props) => props.theme.breakpoints.big};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.big}) {
      max-width: ${(props) => props.theme.breakpoints.large};
    }
  }

  h2 {
    margin-bottom: 0;
  }

  .landing-page__log-in {
    padding-top: 1rem;
    .page__title {
      padding-bottom: 1rem;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      .page__title {
        max-width: 100%;
      }
    }
  }

  .landing-page__create {
    padding-top: ${({ theme }) => theme.spacing.gapBig};

    .page__title {
      margin-bottom: ${({ theme }) => theme.spacing.gapSmall};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      text-align: center;
      .page__title {
        max-width: 100%;
      }
    }
  }
`;

import styled from "styled-components";

export const HeroSectionStyled = styled.section`
  padding-top: 3vh;
  margin-bottom: 5rem;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.7)
      ),
      url("/img/background.jpeg");
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-attachment: fixed;
    background-position: top left;
    max-width: calc(100vw - 4.3%);

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      max-width: calc(100vw - 1.1% + 1px);
    }
  }
  overflow: hidden;

  &:first-child button {
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
  margin: 2rem 0;

  h2 {
    margin-bottom: 0;
  }

  .cta-section {
    color: ${({ theme }) => theme.colors.primary};
    padding: 5rem 0;
  }

  .landing-page__log-in {
    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      .page__title {
        max-width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      background-color: rgb(25, 29, 35);
      left: 0;
      width: 100vw;
      height: 125vh;
      max-width: calc(100vw - 4.3%);
      margin-top: -115vh;

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        height: 100vh;
        max-width: calc(100vw - 1.1% + 1px);
        margin-top: -85vh;
      }
    }
  }

  .landing-page__create {
    button {
      margin-top: ${({ theme }) => theme.spacing.gapSmall};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      text-align: center;
      .page__title {
        max-width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      background-color: rgb(25, 29, 35);
      left: 0;
      width: 100vw;
      height: 54vh;
      max-width: calc(100vw - 4.3%);
      margin-top: -55vh;

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        height: 47vh;
        max-width: calc(100vw - 1.1% + 1px);
        margin-top: -48vh;
      }
    }
  }
`;

import styled from "styled-components";

const ProjectDetailsStyled = styled.article`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  padding: ${({ theme }) => theme.spacing.paddingBig};

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 3.5rem;
  }

  h2 {
    margin: 0;
  }

  h3 {
    margin: 1.5rem 0 0.4rem 0;
  }

  p {
    margin: 0;
  }

  .project {
    &__title {
      font-size: 2.8rem;
      font-weight: normal;

      &-section {
        margin-bottom: ${({ theme }) => theme.spacing.paddingBig};
      }
    }

    &__header-logo {
      object-fit: contain;
      height: 200px;
      width: auto;

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        height: 250px;
        width: auto;
      }
    }

    &__author {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.secondaryBrigther};
    }

    &__subheading {
      font-size: 1.2rem;
    }

    &__technologies {
      display: flex;
      gap: ${({ theme }) => theme.spacing.gapSmall};
    }

    &__technology {
      background-color: ${({ theme }) => theme.colors.primaryDarker};
      color: ${({ theme }) => theme.colors.secondaryBrigther};
      border-radius: 0.2rem;
      padding: 0.1rem 0.7rem;
      font-weight: bold;
    }

    &__cta-text {
      display: block;
      margin-bottom: ${({ theme }) => theme.spacing.gapSmall};
    }

    &__body {
      margin-top: ${({ theme }) => theme.spacing.gapSmall};

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        margin-top: ${({ theme }) => theme.spacing.gapBig};
        display: flex;

        & div {
          flex: 1;
        }
      }
    }
  }
`;

export default ProjectDetailsStyled;

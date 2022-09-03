import styled from "styled-components";

const ProjectDetailsStyled = styled.article`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  padding: ${(props) => props.theme.spacing.paddingBig};

  @media (min-width: ${(props) => props.theme.breakpoints.large}) {
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
      font-size: 2.5rem;
      font-weight: normal;
    }

    &__author {
      color: ${(props) => props.theme.colors.secondaryBrigther};
    }

    &__subheading {
      font-size: 1.2rem;
    }

    &__technologies {
      display: flex;
      gap: ${(props) => props.theme.spacing.gapSmall};
    }

    &__technology {
      background-color: ${(props) => props.theme.colors.primaryDarker};
      color: ${(props) => props.theme.colors.secondaryBrigther};
      border-radius: 0.2rem;
      padding: 0.1rem 0.7rem;
      font-weight: bold;
    }

    &__body {
      margin-top: ${(props) => props.theme.spacing.gapSmall};

      @media (min-width: ${(props) => props.theme.breakpoints.large}) {
        margin-top: ${(props) => props.theme.spacing.gapBig};
        display: flex;

        & div {
          flex: 1;
        }
      }
    }
  }
`;

export default ProjectDetailsStyled;

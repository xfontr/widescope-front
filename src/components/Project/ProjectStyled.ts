import styled from "styled-components";

const ProjectStyled = styled.article`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  padding: ${(props) => props.theme.spacing.paddingBig};

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gapSmall};
  font-size: 1.1rem;

  h3 {
    margin: 0;
    font-size: 1.7rem;
  }

  p {
    margin: 0;
  }

  .project {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: scale-down;
      }
    }

    &__author {
      color: ${(props) => props.theme.colors.secondaryBrigther};
    }

    &__technologies {
      display: flex;
      gap: 1rem;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__technology {
      background-color: ${(props) => props.theme.colors.primaryDarker};
      color: ${(props) => props.theme.colors.secondaryBrigther};
      border-radius: 0.2rem;
      padding: 0.25rem 0.8rem;
      font-weight: bold;
      font-size: 1rem;
    }

    &__description {
      height: 4.5rem;
      overflow: hidden;
    }
  }
`;

export default ProjectStyled;

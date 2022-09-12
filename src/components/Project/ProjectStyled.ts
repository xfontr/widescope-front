import styled from "styled-components";

const ProjectStyled = styled.article`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  padding: ${({ theme }) => theme.spacing.paddingBig};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gapSmall};
  font-size: 1.1rem;
  position: relative;

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
      color: ${({ theme }) => theme.colors.secondaryBrigther};
      cursor: pointer;
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
      background-color: ${({ theme }) => theme.colors.primaryDarker};
      color: ${({ theme }) => theme.colors.secondaryBrigther};
      border-radius: 0.2rem;
      padding: 0.25rem 0.8rem;
      font-weight: bold;
      font-size: 1rem;
      transition: 0.4s;
      cursor: pointer;
    }

    &__technology:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }

    &__description {
      height: 4.5rem;
      overflow: hidden;
    }

    &__options {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default ProjectStyled;

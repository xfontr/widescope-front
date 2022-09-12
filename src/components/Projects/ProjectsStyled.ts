import styled from "styled-components";

const ProjectsStyled = styled.article`
  .projects__list {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.gapBig};

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      flex-wrap: wrap;
      flex-direction: row;

      .projects__project {
        width: 31.15%;
      }
    }
  }
`;

export default ProjectsStyled;

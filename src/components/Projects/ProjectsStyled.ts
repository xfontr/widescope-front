import styled from "styled-components";

const ProjectsStyled = styled.article`
  .projects__list {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.gapBig};

    @media (min-width: ${(props) => props.theme.breakpoints.large}) {
      flex-wrap: wrap;
      flex-direction: row;

      .projects__project {
        max-width: 30%;
      }
    }
  }
`;

export default ProjectsStyled;
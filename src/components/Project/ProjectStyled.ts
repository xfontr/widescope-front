import styled from "styled-components";

const ProjectStyled = styled.article`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  padding: ${(props) => props.theme.spacing.paddingBig};

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gapSmall};
  font-size: 1.3rem;

  h3 {
    margin: 0;
    font-size: 1.7rem;
  }

  p {
    margin: 0;
  }

  .project__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .project__author {
    color: ${(props) => props.theme.colors.secondaryBrigther};
  }

  .project__technologies {
    display: flex;
    gap: ${(props) => props.theme.spacing.gapSmall};
  }

  .project__technology {
    background-color: ${(props) => props.theme.colors.primaryDarker};
    color: ${(props) => props.theme.colors.secondaryBrigther};
    border-radius: 0.2rem;
    padding: 0.1rem 0.7rem;
    font-weight: bold;
  }
`;

export default ProjectStyled;

import React from "react";
import { Filter } from "../../types/filter";
import { Projects as IProjects } from "../../types/project";
import Project from "../Project/Project";
import ProjectsStyled from "./ProjectsStyled";

interface ProjectsProps {
  projects: IProjects;
  setFilter?: React.Dispatch<React.SetStateAction<Filter>>;
  isReadOnly?: boolean;
}

const Projects = ({
  projects,
  setFilter,
  isReadOnly = true,
}: ProjectsProps): JSX.Element => {
  return (
    <ProjectsStyled>
      <ul className="projects__list">
        {projects.map((project, index) => (
          <li className="projects__project" key={`${project.id}${index}`}>
            <Project
              project={project}
              setFilter={setFilter}
              key={project.id}
              isReadOnly={isReadOnly}
            />
          </li>
        ))}
      </ul>
    </ProjectsStyled>
  );
};

export default Projects;

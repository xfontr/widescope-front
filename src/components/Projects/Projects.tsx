import React from "react";
import { Filter } from "../../types/filter";
import { Projects as IProjects } from "../../types/project";
import ProjectsStyled from "./ProjectsStyled";

const Project = React.lazy(() => import("../Project/Project"));

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
            <React.Suspense
              fallback={<div className="loading-card">Loading...</div>}
            >
              <Project
                project={project}
                setFilter={setFilter}
                key={project.id}
                isReadOnly={isReadOnly}
              />
            </React.Suspense>
          </li>
        ))}
      </ul>
    </ProjectsStyled>
  );
};

export default Projects;

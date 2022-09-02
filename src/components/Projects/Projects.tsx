import { Projects as IProjects } from "../../types/project";
import Project from "../Project/Project";
import ProjectsStyled from "./ProjectsStyled";

interface ProjectsProps {
  projects: IProjects;
}

const Projects = ({ projects }: ProjectsProps): JSX.Element => {
  return (
    <ProjectsStyled>
      <ul className="projects__list" key="project-list">
        {projects.map((project) => (
          <li className="projects__project">
            <Project project={project} key={project.id} />
          </li>
        ))}
      </ul>
    </ProjectsStyled>
  );
};

export default Projects;

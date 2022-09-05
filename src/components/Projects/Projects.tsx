import { Filter } from "../../types/filter";
import { Projects as IProjects } from "../../types/project";
import Project from "../Project/Project";
import ProjectsStyled from "./ProjectsStyled";

interface ProjectsProps {
  projects: IProjects;
  setFilter?: React.Dispatch<React.SetStateAction<Filter>>;
}

const Projects = ({ projects, setFilter }: ProjectsProps): JSX.Element => {
  return (
    <ProjectsStyled>
      <ul className="projects__list" key="project-list">
        {projects.map((project) => (
          <li className="projects__project">
            <Project project={project} setFilter={setFilter} key={project.id} />
          </li>
        ))}
      </ul>
    </ProjectsStyled>
  );
};

export default Projects;

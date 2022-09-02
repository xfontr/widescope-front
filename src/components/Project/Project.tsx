import { IProject } from "../../types/project";
import ProjectStyled from "./ProjectStyled";

interface ProjectProps {
  project: IProject;
}

const Project = ({ project }: ProjectProps): JSX.Element => (
  <ProjectStyled>
    <div className="project__header">
      <div className="project__main-data">
        <span className="project__author">{project.author}</span>
        <h3 className="project__title">{project.name}</h3>
      </div>
      <img
        src={project.logo}
        alt={`${project.name} logo`}
        className="project__header-logo"
      />
    </div>
    <ul className="project__technologies">
      {project.technologies.map((technology) => (
        <li className="project__technology">
          {`${technology.charAt(0).toUpperCase()}${technology.slice(1)}`}
        </li>
      ))}
    </ul>
  </ProjectStyled>
);

export default Project;

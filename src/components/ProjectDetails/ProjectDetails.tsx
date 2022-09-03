import { IProject } from "../../types/project";
import ProjectDetailsStyled from "./ProjectDetailsStyled";
import Button from "../Button/Button";
interface ProjectDetailsProps {
  project: IProject;
}

const ProjectDetails = ({ project }: ProjectDetailsProps): JSX.Element => {
  return (
    <ProjectDetailsStyled>
      <div className="project__title-section">
        <h2 className="project__title">{project.name}</h2>
        <span className="project__author">developed by {project.author}</span>
      </div>

      <img src={project.logo} alt={`${project.name} logo`} />

      <div className="project__body">
        <div className="project__body-data">
          <h3 className="project__subheading">Description</h3>
          <p className="project__description">{project.description}</p>

          <h3 className="project__subheading">Built with</h3>
          <ul className="project__technologies">
            {project.technologies.map((technology) => (
              <li
                className="project__technology"
                key={`${project.id}-technology`}
              >
                {`${technology.charAt(0).toUpperCase()}${technology.slice(1)}`}
              </li>
            ))}
          </ul>

          <h3 className="project__subheading">Post date</h3>
          <span className="project__post-date">{project.creationDate}</span>
        </div>

        <div className="project__cta">
          <h3 className="project__subheading--cta">You like how it sounds?</h3>
          <span className="project__cta-text">
            See it yourself from the repository shared by the author
          </span>

          <Button
            type="link"
            content="Take me to the code (free)"
            link="https://www.google.com/"
          />
        </div>
      </div>
    </ProjectDetailsStyled>
  );
};

export default ProjectDetails;

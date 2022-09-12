import { IProject } from "../../types/project";
import ProjectDetailsStyled from "./ProjectDetailsStyled";
import Button from "../Button/Button";

const apiUrl = process.env.REACT_APP_API_URL;
interface ProjectDetailsProps {
  project: IProject;
}

const ProjectDetails = ({ project }: ProjectDetailsProps): JSX.Element => {
  const creationDate = [
    new Date(project.creationDate).getFullYear(),
    new Date(project.creationDate).getDate(),
    new Date(project.creationDate).getMonth(),
  ].join("/");

  return (
    <ProjectDetailsStyled>
      <div className="project__title-section">
        <h2 className="project__title">{project.name}</h2>
        <span className="project__author">developed by {project.author}</span>
      </div>

      <img
        src={`${apiUrl}/uploads/${project.logo}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `${project.logoBackup.slice(
            0,
            -project.logo.length
          )}${project.logo}`;
        }}
        alt={`${project.name} logo`}
        width="250"
        height="250"
        className="project__header-logo"
      />

      <div className="project__body">
        <div className="project__body-data">
          <h3 className="project__subheading">Description</h3>
          <p className="project__description">{project.description}</p>

          <h3 className="project__subheading">Built with</h3>
          <ul className="project__technologies">
            {project.technologies.map((technology, index) => (
              <li
                className="project__technology"
                key={`${project.id}-technology-${index}`}
              >
                {`${technology.charAt(0).toUpperCase()}${technology.slice(1)}`}
              </li>
            ))}
          </ul>

          <h3 className="project__subheading">Post date</h3>
          <span className="project__post-date">{creationDate}</span>
        </div>

        <div className="project__cta">
          <h3 className="project__subheading--cta">You like how it sounds?</h3>
          <span className="project__cta-text">
            See it yourself from the repository shared by the author
          </span>

          <Button
            renderAs="a"
            children="Take me to the code (free)"
            link={project.repository}
          />
        </div>
      </div>
    </ProjectDetailsStyled>
  );
};

export default ProjectDetails;

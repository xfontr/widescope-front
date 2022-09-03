import Button from "../Button/Button";

import { IProject } from "../../types/project";

interface ProjectDetailsProps {
  project: IProject;
}

const ProjectDetails = ({ project }: ProjectDetailsProps): JSX.Element => {
  return (
    <article>
      <div className="project__title-section">
        <h2 className="project__title">{project.name}</h2>
        <h2 className="project__author">{project.author}</h2>
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
        </div>
      </div>
    </article>
  );
};

export default ProjectDetails;

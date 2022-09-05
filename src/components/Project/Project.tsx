import { IProject } from "../../types/project";
import ProjectStyled from "./ProjectStyled";
import Button from "./../Button/Button";
import { useNavigate } from "react-router-dom";
import { Filter } from "../../types/filter";
import { useAppSelector } from "../../app/hooks";

const apiUrl = process.env.REACT_APP_API_URL;
interface ProjectProps {
  project: IProject;
  setFilter?: React.Dispatch<React.SetStateAction<Filter>>;
}

const Project = ({ project, setFilter }: ProjectProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <ProjectStyled>
      <div className="project__header">
        <div className="project__main-data">
          <span
            className="project__author"
            onClick={() =>
              setFilter &&
              setFilter({
                filter: "byAuthor",
                byAuthor: {
                  id: project.authorId,
                  name: project.author,
                },
              })
            }
          >
            {project.author}
          </span>
          <h3 className="project__title">{project.name}</h3>
        </div>
        <img
          src={`${apiUrl}/uploads/${project.logo.slice(8)}`}
          alt={`${project.name} logo`}
          width="60"
          height="60"
          className="project__header-logo"
          loading="lazy"
        />
      </div>

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

      <p className="project__description">{project.description}</p>

      <Button
        content="View full project"
        type="button"
        customStyle="outline"
        action={() => {
          navigate(`/project/${project.id}`);
        }}
      />
    </ProjectStyled>
  );
};

export default Project;

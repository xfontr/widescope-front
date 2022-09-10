import { IProject } from "../../types/project";
import ProjectStyled from "./ProjectStyled";
import Button from "./../Button/Button";
import { useNavigate } from "react-router-dom";
import { Filter } from "../../types/filter";
import useProjects from "../../hooks/useProjects/useProjects";
import { filterInitialState } from "../../pages/ExplorePage/ExplorePage";

const apiUrl = process.env.REACT_APP_API_URL;
interface ProjectProps {
  project: IProject;
  setFilter?: React.Dispatch<React.SetStateAction<Filter>>;
  isReadOnly?: boolean;
}

const Project = ({
  project,
  setFilter,
  isReadOnly = true,
}: ProjectProps): JSX.Element => {
  const navigate = useNavigate();
  const { deleteProject } = useProjects();

  return (
    <ProjectStyled>
      <div className="project__header">
        <div className="project__main-data">
          <span
            className="project__author"
            onClick={() =>
              setFilter &&
              setFilter({
                ...filterInitialState,
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
          src={`${apiUrl}/uploads/r_${project.logo}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${project.logoBackup.slice(
              0,
              -project.logo.length
            )}r_${project.logo}`;
          }}
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
            onClick={() => {
              setFilter &&
                setFilter({
                  ...filterInitialState,
                  filter: "byTechnology",
                  byTechnology: technology,
                });
            }}
          >
            {`${technology.charAt(0).toUpperCase()}${technology.slice(1)}`}
          </li>
        ))}
      </ul>

      <p className="project__description">{project.description}</p>

      <div className="project__options">
        <Button
          renderAs="a"
          customStyle="outline"
          action={() => {
            navigate(`/project/${project.id}`);
          }}
        >
          View full project
        </Button>
        {!isReadOnly && (
          <>
            <Button
              type="button"
              aria-label="delete"
              customStyle="default-icon"
              action={async () => {
                await deleteProject(project.id);
              }}
            >
              <i className="fa">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </i>
            </Button>

            <Button
              type="button"
              aria-label="update"
              customStyle="default-icon"
              action={() => {
                navigate(`/projects/update/${project.id}`);
              }}
            >
              <i className="fa">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z" />
                </svg>
              </i>
            </Button>
          </>
        )}
      </div>
    </ProjectStyled>
  );
};

export default Project;

import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Projects from "../../components/Projects/Projects";
import useProjects from "../../hooks/useProjects/useProjects";

const UserProjectsPage = (): JSX.Element => {
  const { getByAuthor } = useProjects();
  const userId = useAppSelector((state) => state.user.user.id);

  useEffect(() => {
    getByAuthor(userId);
  }, [getByAuthor, userId]);

  const projects = useAppSelector((state) => state.userData.userData.projects);

  return (
    <>
      <h2 className="page__title">
        Your creations.
        <span className="page__title--bold"> Thanks for sharing!</span>
      </h2>

      {projects.length && <Projects projects={projects} />}

      {!projects.length && (
        <span>
          You don't seem to have any project up. What about sharing one of your
          works?
        </span>
      )}
    </>
  );
};

export default UserProjectsPage;

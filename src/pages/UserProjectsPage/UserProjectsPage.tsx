import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Projects from "../../components/Projects/Projects";
import useProjects from "../../hooks/useProjects/useProjects";

const UserProjectsPage = (): JSX.Element => {
  const { getByAuthor } = useProjects();
  const { id, isLogged } = useAppSelector((state) => ({
    id: state.user.user.id,
    isLogged: state.user.isLogged,
  }));

  useEffect(() => {
    (async () => {
      isLogged && (await getByAuthor(id!));
    })();
  }, [getByAuthor, id, isLogged]);

  const projects = useAppSelector((state) =>
    isLogged ? state.userData.projects : []
  );

  return (
    <>
      <h2 className="page__title">
        Your creations.
        <span className="page__title--bold"> Thanks for sharing!</span>
      </h2>

      {projects.length ? (
        <Projects projects={projects} isReadOnly={false} />
      ) : (
        <span>
          You don't seem to have any project up. What about sharing one of your
          works?
        </span>
      )}
    </>
  );
};

export default UserProjectsPage;

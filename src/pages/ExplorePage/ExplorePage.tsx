import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Projects from "../../components/Projects/Projects";
import useProjects from "../../hooks/useProjects/useProjects";

const ExplorePage = (): JSX.Element => {
  const { getAll } = useProjects();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const allProjects = useAppSelector((state: RootState) => state.projects);

  return (
    <>
      <h2 className="page__title">
        These are the <span className="page__title--bold">latest projects</span>
      </h2>

      {allProjects.length && <Projects projects={allProjects} />}
      {!allProjects.length && <span>No projects found.</span>}
    </>
  );
};

export default ExplorePage;

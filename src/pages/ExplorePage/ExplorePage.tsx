import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Projects from "../../components/Projects/Projects";
import useProjects from "../../hooks/useProjects/useProjects";
import { Filter } from "../../types/filter";
import { Projects as IProjects } from "../../types/project";

const filterInitialState: Filter = {
  filter: "all",
  byAuthor: {
    id: "",
    name: "",
  },
};

const ExplorePage = (): JSX.Element => {
  const { getAll, getByAuthor } = useProjects();
  const [filter, setFilter] = useState(filterInitialState);
  const [projects, setProjects] = useState([] as IProjects);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const state = useAppSelector((state: RootState) => state);

  useEffect(() => {
    (async () => {
      switch (filter.filter) {
        case "all":
          setProjects(state.projects);
          break;
        case "byAuthor":
          const byAuthor = await getByAuthor(filter.byAuthor.id);
          setProjects(byAuthor as IProjects);
          break;
      }
    })();
  }, [filter.filter, filter.byAuthor, state.projects, getByAuthor]);

  return (
    <>
      {filter.filter === "all" && (
        <h2 className="page__title">
          These are the
          <span className="page__title--bold"> latest projects</span>
        </h2>
      )}

      {filter.filter === "byAuthor" && (
        <h2 className="page__title">
          Projects by
          <span className="page__title--bold"> {filter.byAuthor.name}</span>
        </h2>
      )}

      {projects.length && (
        <Projects projects={projects} setFilter={setFilter} />
      )}
      {!projects.length && <span>No projects found.</span>}
    </>
  );
};

export default ExplorePage;

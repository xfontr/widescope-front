import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Projects from "../../components/Projects/Projects";
import useProjects from "../../hooks/useProjects/useProjects";
import { Filter } from "../../types/filter";
import { Projects as IProjects } from "../../types/project";
import Pagination from "../../components/Pagination/Pagination";

export const filterInitialState: Filter = {
  filter: "all",
  byAuthor: {
    id: "",
    name: "",
  },
  byTechnology: "",
};

const ExplorePage = memo((): JSX.Element => {
  const { getAll, getByAuthor } = useProjects();
  const [{ filter, byAuthor, byTechnology }, setFilter] =
    useState(filterInitialState);
  const [projects, setProjects] = useState([] as IProjects);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      await getAll(page, byTechnology);
    })();
  }, [getAll, page, byTechnology]);

  const state = useAppSelector((state: RootState) => state);

  useEffect(() => {
    (async () => {
      if (filter === "byAuthor") {
        const projectsByAuthor = await getByAuthor(byAuthor.id);
        setProjects(projectsByAuthor as IProjects);
        return;
      }

      setProjects(state.projects);
    })();
  }, [filter, byAuthor, state.projects, getByAuthor]);

  return (
    <>
      {filter !== "all" && (
        <span
          className="page__breadcrumbs"
          onClick={() => setFilter(filterInitialState)}
        >
          « Keep exploring
        </span>
      )}

      {filter !== "byAuthor" && (
        <>
          <h2 className="page__title">
            These are the
            <span className="page__title--bold"> latest projects</span>
          </h2>
          {filter === "byTechnology" && (
            <span className="page__title-subheading">
              Searching by: Technology ({byTechnology})
            </span>
          )}
        </>
      )}

      {filter === "byAuthor" && (
        <h2 className="page__title">
          Projects by
          <span className="page__title--bold"> {byAuthor.name}</span>
        </h2>
      )}

      {projects.length && (
        <>
          <Projects projects={projects} setFilter={setFilter} />
          {filter !== "byAuthor" && (
            <Pagination page={page} setPage={setPage} />
          )}
        </>
      )}

      {!projects.length && <span>No projects found.</span>}
    </>
  );
});

export default ExplorePage;

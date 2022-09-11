import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";
import useProjects from "../../hooks/useProjects/useProjects";
import { IProject } from "../../types/project";

const ProjectDetailsPage = memo((): JSX.Element => {
  const { getById } = useProjects();
  const { projectId } = useParams();
  const [currentProject, setProject] = useState(false as IProject | false);

  useEffect(() => {
    (async () => {
      try {
        const retreivedProject = await getById(projectId as string);
        setProject(retreivedProject as IProject);
      } catch (error) {}
    })();
  }, [getById, projectId, setProject]);

  return (
    <>
      {!currentProject && (
        <div className="page-container">
          <span>Project not found.</span>
        </div>
      )}
      {currentProject && <ProjectDetails project={currentProject} />}
    </>
  );
});

export default ProjectDetailsPage;

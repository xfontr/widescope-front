import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import ProjectForm from "../../components/ProjectForm/ProjectForm";

interface ManageProjectPageProps {
  isCreate: boolean;
}

const ManageProjectPage = ({
  isCreate,
}: ManageProjectPageProps): JSX.Element => {
  const { projectId } = useParams();
  const requestedProject = useAppSelector((state) =>
    state.userData.projects.find(({ id }) => id === projectId)
  );

  const [project] = useState(requestedProject);

  return (
    <>
      <h2 className="page__title">
        {isCreate ? "New project" : "Update project"}
      </h2>

      {!isCreate && project && (
        <ProjectForm isCreate={isCreate} project={project} />
      )}
      {!isCreate && !project && <span>Loading the requested project...</span>}
      {isCreate && <ProjectForm isCreate={isCreate} />}
    </>
  );
};

export default ManageProjectPage;

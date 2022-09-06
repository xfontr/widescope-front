import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { IProject } from "../../types/project";

interface ManageProjectPageProps {
  isCreate: boolean;
  project?: IProject;
}

const ManageProjectPage = ({
  isCreate,
  project,
}: ManageProjectPageProps): JSX.Element => (
  <>
    <h2 className="page__title">
      {isCreate ? "New project" : "Update project"}
    </h2>

    <ProjectForm isCreate={isCreate} project={project} />
  </>
);

export default ManageProjectPage;

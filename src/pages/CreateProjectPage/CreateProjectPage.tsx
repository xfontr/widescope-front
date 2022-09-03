import ProjectForm from "../../components/ProjectForm/ProjectForm";

const CreateProjectPage = (): JSX.Element => (
  <>
    <h2 className="page__title">New project</h2>

    <ProjectForm isCreate={true} />
  </>
);

export default CreateProjectPage;

import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { navRoutes } from "../../configs/routes";
import useProjects from "../../hooks/useProjects/useProjects";
import projectSchema from "../../schemas/projectSchema";
import {
  FooterStyled,
  HeaderStyled,
  SignFormStyled,
} from "../RenderForm/RenderFormStyled";
import { IProject } from "../../types/project";
import { FormErrors, validateForm } from "../../utils/forms/validateForm";
import Button from "../Button/Button";
import Errors from "../Errors/Errors";
import RenderForm from "../RenderForm/RenderForm";

const errorsInitialState: FormErrors = {
  errors: [],
  failedInputs: [],
};
interface ProjectFormProps {
  isCreate: boolean;
  project?: IProject;
}

const formData = new FormData();

const ProjectForm = ({ isCreate, project }: ProjectFormProps): JSX.Element => {
  const { create, update } = useProjects();
  const user = useAppSelector((state: RootState) => state.user.user);
  const [errors, setErrors] = useState(errorsInitialState);
  const navigate = useNavigate();

  const projectFormInitialState = {
    name: project ? project.name : "",
    repository: project ? project.repository : "",
    logo: "",
    logoUpdate: "",
    technologyFront: project ? project.technologies[0] : "",
    technologyBack: project ? project.technologies[1] : "",
    description: project ? project.description : "",
  };
  const [values, setValues] = useState(projectFormInitialState);

  const curateData = () => ({
    author: user.name,
    authorId: user.id,
    name: values.name,
    repository: values.repository,
    technologies: [values.technologyBack, values.technologyFront],
    description: values.description,
  });

  const clearForm = () => {
    formData.delete("logo");
    formData.delete("logoUpdate");
    formData.delete("project");

    setValues(projectFormInitialState);
    setErrors(errorsInitialState);

    navigate(navRoutes.personalProjects.path);
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (!validateForm(projectSchema, values, setErrors)) {
      return;
    }

    formData.append("project", JSON.stringify(curateData()));

    if (isCreate) {
      await create(formData);
    } else {
      await update(formData, project!.id);
    }

    clearForm();
  };

  return (
    <SignFormStyled onSubmit={handleSubmit} data-testid="form">
      <HeaderStyled>
        <h3 className="form__title">
          {isCreate ? "Tell us about your project" : `Update ${project!.name}`}
        </h3>
      </HeaderStyled>

      <RenderForm
        errors={errors}
        formType={isCreate ? "createProject" : "updateProject"}
        state={values}
        setter={setValues}
        formData={formData}
      />

      <Errors errors={errors} />

      <FooterStyled>
        <Button
          children={isCreate ? "Create project" : "Update project"}
          type="submit"
        />
      </FooterStyled>
    </SignFormStyled>
  );
};

export default ProjectForm;

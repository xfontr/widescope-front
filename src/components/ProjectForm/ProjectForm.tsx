import Joi from "joi";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { navRoutes } from "../../configs/routes";
import useProjects from "../../hooks/useProjects/useProjects";
import projectSchema from "../../schemas/projectSchema";
import {
  FooterStyled,
  GroupStyled,
  HeaderStyled,
  InputStyled,
  LabelStyled,
  SignFormStyled,
} from "../../styles/FormStyled";
import { IProject } from "../../types/project";
import { validateForm } from "../../utils/validateForm/validateForm";
import Button from "../Button/Button";
import Errors from "../Errors/Errors";

const errorsInitialState = {
  errors: [] as Joi.ValidationErrorItem[],
  failedInputs: [] as string[],
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

  const initialState = {
    name: project ? project.name : "",
    repository: project ? project.repository : "",
    logo: "",
    technologyFront: project ? project.technologies[0] : "",
    technologyBack: project ? project.technologies[1] : "",
    description: project ? project.description : "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });

    event.target.type === "file" &&
      formData.append(
        `${isCreate ? "logo" : "logo_update"}`,
        (event as React.ChangeEvent<HTMLInputElement>).target.files![0]
      );
  };

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
    formData.delete("logo_update");
    formData.delete("project");

    setValues(initialState);
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

      <GroupStyled>
        <LabelStyled htmlFor="name">Name</LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("name") ? "form__input--error" : ""
          }
          type="text"
          id="name"
          placeholder="John Doe"
          autoComplete="off"
          value={values.name}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="repository">Repository URL</LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("repository")
              ? "form__input--error"
              : ""
          }
          type="text"
          id="repository"
          placeholder="Your Github, etc. repository"
          autoComplete="off"
          value={values.repository}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled className="area">
        <LabelStyled htmlFor="logo">Project logo</LabelStyled>
        <InputStyled as="div" className="drop-area">
          <span>Drop your logo here</span>
          <input
            type="file"
            id="logo"
            name={isCreate ? "logo" : "logo_update"}
            autoComplete="off"
            value={values.logo}
            onChange={handleChange}
          />
        </InputStyled>
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="technologyFront">
          Frontend main library or framework
        </LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("technologyFront")
              ? "form__input--error"
              : ""
          }
          type="text"
          id="technologyFront"
          placeholder="React"
          autoComplete="off"
          value={values.technologyFront}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="technologyBack">
          Backend main library or framework
        </LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("technologyBack")
              ? "form__input--error"
              : ""
          }
          type="text"
          id="technologyBack"
          placeholder="Express"
          autoComplete="off"
          value={values.technologyBack}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled className="area">
        <LabelStyled htmlFor="name">Description</LabelStyled>
        <InputStyled
          as="textarea"
          className={
            errors.failedInputs.includes("description")
              ? "form__input--error"
              : ""
          }
          id="description"
          placeholder="Music app is a wonderful system to share music between its users."
          autoComplete="off"
          value={values.description}
          onChange={handleChange}
        />
      </GroupStyled>

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

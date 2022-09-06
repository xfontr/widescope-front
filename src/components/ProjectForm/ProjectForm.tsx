import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import routes from "../../configs/routes";
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
import Button from "../Button/Button";

interface ProjectFormProps {
  isCreate: boolean;
  project?: IProject;
}

const formData = new FormData();

const ProjectForm = ({ isCreate, project }: ProjectFormProps): JSX.Element => {
  const { create, update } = useProjects();
  const user = useAppSelector((state: RootState) => state.user.user);
  const [errors, setErrors] = useState([] as string[]);
  const navigate = useNavigate();

  const initialState = {
    name: project ? project.name : "",
    repository: project ? project.repository : "",
    logo: project ? project.logo : "",
    technologyFront: project ? project.technologies[0] : "",
    technologyBack: project ? project.technologies[1] : "",
    description: project ? project.description : "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const validateValues = (): boolean => {
    const validation = projectSchema.validate(values, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(
        (failedInput) => failedInput.path[0]
      );

      setErrors(errors as string[]);

      return false;
    } else {
      return true;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formData.append("logo", event.target.files![0]);

    handleChange(event);
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
    formData.delete("project");

    setValues(initialState);
    setErrors([]);

    navigate(routes.personalProjects);
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (!validateValues()) {
      return;
    }

    if (initialState.logo === values.logo) {
      formData.delete("logo");
    }

    formData.append("project", JSON.stringify(curateData()));

    if (isCreate) {
      await create(formData);
    } else {
      await update(formData);
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
          className={errors.includes("name") ? "form__input--error" : ""}
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
          className={errors.includes("repository") ? "form__input--error" : ""}
          type="text"
          id="repository"
          placeholder="Your Github, etc. repository"
          autoComplete="off"
          value={values.repository}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="logo">Project logo</LabelStyled>
        <InputStyled
          className={errors.includes("logo") ? "form__input--error" : ""}
          type="file"
          id="logo"
          name="logo"
          autoComplete="off"
          value={values.logo}
          onChange={handleFileChange}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="technologyFront">
          Frontend main library or framework
        </LabelStyled>
        <InputStyled
          className={
            errors.includes("technologyFront") ? "form__input--error" : ""
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
            errors.includes("technologyBack") ? "form__input--error" : ""
          }
          type="text"
          id="technologyBack"
          placeholder="Express"
          autoComplete="off"
          value={values.technologyBack}
          onChange={handleChange}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="name">Description</LabelStyled>
        <InputStyled
          className={errors.includes("description") ? "form__input--error" : ""}
          type="text"
          id="description"
          placeholder="Music app is a wonderful system to share music between its users."
          autoComplete="off"
          value={values.description}
          onChange={handleChange}
        />
      </GroupStyled>

      <FooterStyled>
        <Button
          content={isCreate ? "Create project" : "Update project"}
          type="submit"
        />
      </FooterStyled>
    </SignFormStyled>
  );
};

export default ProjectForm;

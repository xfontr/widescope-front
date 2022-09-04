import { SyntheticEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import useProjects from "../../hooks/useProjects/useProjects";
import {
  GroupStyled,
  InputStyled,
  LabelStyled,
  SignFormStyled,
} from "../../styles/FormStyled";
import { IProject } from "../../types/project";
import Button from "../Button/Button";

interface ProjectFormProps {
  isCreate: boolean;
}

const initialState = {
  name: "",
  repository: "",
  logo: "",
  technologyFront: "",
  technologyBack: "",
  description: "",
};

const formData = new FormData();

const ProjectForm = ({ isCreate }: ProjectFormProps): JSX.Element => {
  const [values, setValues] = useState(initialState);
  const { create } = useProjects();
  const username = useAppSelector((state: RootState) => state.user.user.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formData.append("logo", event.target.files![0]);

    handleChange(event);
  };

  const curateData = (): Partial<IProject> => ({
    author: username,
    name: values.name,
    repository: values.repository,
    technologies: [values.technologyBack, values.technologyFront],
    description: values.description,
  });

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    formData.append("project", JSON.stringify(curateData()));

    await create(formData);
  };

  return (
    <SignFormStyled onSubmit={handleSubmit} data-testid="form">
      <h3 className="form__title">
        {isCreate ? "Tell us about your project" : "Update your project"}
      </h3>

      <GroupStyled>
        <LabelStyled htmlFor="name">Name</LabelStyled>
        <InputStyled
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
          type="text"
          id="description"
          placeholder="Music app is a wonderful system to share music between its users."
          autoComplete="off"
          value={values.description}
          onChange={handleChange}
        />
      </GroupStyled>

      <Button
        content={isCreate ? "Create project" : "Update project"}
        type="submit"
      />
    </SignFormStyled>
  );
};

export default ProjectForm;

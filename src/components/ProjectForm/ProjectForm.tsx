import { useState } from "react";
import {
  GroupStyled,
  InputStyled,
  LabelStyled,
  SignFormStyled,
} from "../../styles/FormStyled";
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

const ProjectForm = ({ isCreate }: ProjectFormProps): JSX.Element => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <SignFormStyled>
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
        <LabelStyled htmlFor="name">Repository URL</LabelStyled>
        <InputStyled
          type="text"
          id="repository"
          placeholder="John Doe"
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
          autoComplete="off"
          value={values.logo}
          onChange={handleChange}
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

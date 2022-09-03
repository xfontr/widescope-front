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

const ProjectForm = ({ isCreate }: ProjectFormProps): JSX.Element => (
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
      />
    </GroupStyled>

    <GroupStyled>
      <LabelStyled htmlFor="name">Repository URL</LabelStyled>
      <InputStyled
        type="text"
        id="repository"
        placeholder="John Doe"
        autoComplete="off"
      />
    </GroupStyled>

    <GroupStyled>
      <LabelStyled htmlFor="name">Project logo</LabelStyled>
      <InputStyled type="file" id="name" autoComplete="off" />
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
      />
    </GroupStyled>

    <GroupStyled>
      <LabelStyled htmlFor="name">Description</LabelStyled>
      <InputStyled
        type="text"
        id="name"
        placeholder="Music app is a wonderful system to share music between its users."
        autoComplete="off"
      />
    </GroupStyled>

    <Button
      content={isCreate ? "Create project" : "Update project"}
      type="submit"
    />
  </SignFormStyled>
);

export default ProjectForm;

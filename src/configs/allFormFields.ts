import {
  FormComponents,
  FormFields,
} from "../components/RenderForm/RenderFormTypes";

export interface FormValue {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: FormFields;
  belongsTo: FormComponents[];
  placeholder?: string;
  customClass?: string;
  customGroupClass?: string;
  renderAs?: "input" | "textarea";
}

export const allFormFields: Record<FormFields, FormValue> = {
  name: {
    type: "text",
    label: "Name",
    name: "name",
    belongsTo: ["logIn", "signUp"],
    placeholder: "John Doe",
    customClass: "form__input--user",
  },

  password: {
    type: "password",
    label: "Password",
    name: "password",
    belongsTo: ["logIn", "signUp"],
    customClass: "form__input--password",
  },

  repeatPassword: {
    type: "password",
    label: "Repeat password",
    name: "repeatPassword",
    belongsTo: ["signUp"],
  },

  email: {
    type: "email",
    label: "Email address",
    name: "email",
    belongsTo: ["signUp"],
  },

  projectName: {
    type: "text",
    label: "Name",
    name: "name",
    placeholder: "Music app",
    belongsTo: ["createProject", "updateProject"],
  },

  repository: {
    type: "text",
    label: "Repository URL",
    name: "repository",
    placeholder: "http://www.github.com/music-app",
    belongsTo: ["createProject", "updateProject"],
  },

  logo: {
    type: "file",
    label: "Project logo",
    name: "logo",
    belongsTo: ["createProject"],
    customGroupClass: "area",
  },

  logoUpdate: {
    type: "file",
    label: "Project logo",
    name: "logoUpdate",
    belongsTo: ["updateProject"],
    customGroupClass: "area",
  },

  technologyFront: {
    type: "text",
    label: "Frontend main library or framework",
    name: "technologyFront",
    placeholder: "React",
    belongsTo: ["createProject", "updateProject"],
  },

  technologyBack: {
    type: "text",
    label: "Backend main library or framework",
    name: "technologyBack",
    placeholder: "React",
    belongsTo: ["createProject", "updateProject"],
  },

  description: {
    label: "Description",
    name: "description",
    placeholder: "Music app is about sharing music between users",
    belongsTo: ["createProject", "updateProject"],
    renderAs: "textarea",
    customGroupClass: "area",
  },
};

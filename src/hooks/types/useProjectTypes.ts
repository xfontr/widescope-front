import { IProject, Projects } from "../../types/project";

export interface GetAllProjects {
  projects: Projects | "No projects found";
}

export interface GetProjectById {
  projects: IProject | "No projects found";
}

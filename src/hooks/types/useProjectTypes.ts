import { IProject, Projects } from "../../types/project";

export interface GetAllProjects {
  projects: Projects | "No projects found";
}

export interface GetProjectById {
  project: IProject | "No projects found";
}

export interface NewProject {
  projectCreated: IProject;
}

export interface UserProjects {
  projectsByAuthor: {
    author: string;
    total: number | string;
    projects: Projects;
  };
}

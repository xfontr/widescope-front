import { IProject, Projects } from "../../types/project";

export interface GetAllProjects {
  projects: {
    offset: number;
    limit: number;
    list: Projects;
  };
}

export interface GetProjectById {
  project: IProject | "No projects found";
}

export interface NewProject {
  projectCreated: IProject;
}

export interface UpdatedProject {
  projectUpdated: IProject;
}

export interface UserProjects {
  projectsByAuthor: {
    author: string;
    total: number | string;
    projects: Projects;
  };
}

export interface IProject {
  id: string;
  name: string;
  repository: string;
  technologies: string[];
  creationDate: string;
  author: string;
  description: string;
  logo: string;
}

export type Projects = IProject[];
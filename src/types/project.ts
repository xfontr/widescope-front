export interface IProject {
  id: string;
  name: string;
  repository: string;
  creationDate: Date;
  author: string;
  description: string;
  logo: string;
}

export type Projects = IProject[];

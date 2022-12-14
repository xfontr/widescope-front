export interface IProject {
  id: string;
  name: string;
  repository: string;
  technologies: string[];
  creationDate: string;
  author: string;
  authorId: string;
  description: string;
  logo: string;
  logoBackup: string;
}

export type Projects = IProject[];

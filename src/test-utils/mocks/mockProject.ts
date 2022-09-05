import { IProject } from "../../types/project";
import mockUser from "./mockUser";

const mockProject: IProject = {
  id: "630e31ecb968115ba6a3e29f",
  name: "Project123",
  description: "The description",
  technologies: ["react", "express"],
  repository: "www.google.com",
  author: mockUser.name,
  authorId: mockUser.id,
  logo: "ProjectLogo.png",
  creationDate: "2022-09-02T08:35:07.126Z",
};

export default mockProject;

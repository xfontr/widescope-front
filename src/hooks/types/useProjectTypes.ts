import { Projects } from "../../types/project";

interface GetAllProjects {
  projects: Projects | "No projects found";
}

export default GetAllProjects;

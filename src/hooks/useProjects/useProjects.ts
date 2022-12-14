import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { batch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import endpoints from "../../configs/endpoints";
import {
  addProjectActionCreator,
  deleteProjectActionCreator,
  loadAllActionCreator,
  updateProjectActionCreator,
} from "../../store/slices/projects/projectsSlice";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import {
  addUserProjectActionCreator,
  deleteUserProjectActionCreator,
  loadUserProjectsActionCreator,
  updateUserProjectActionCreator,
} from "../../store/slices/userData/userDataSlice";
import { IProject, Projects } from "../../types/project";
import {
  GetAllProjects,
  GetProjectById,
  NewProject,
  UpdatedProject,
  UserProjects,
} from "../types/useProjectTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useProjects = () => {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.user.user);

  const getAll = useCallback(
    async (offset = 0, technology = ""): Promise<void> => {
      const limit = 10;
      dispatch(setVisibilityActionCreator(true));

      try {
        const {
          data: { projects },
        }: AxiosResponse<GetAllProjects> = await axios.get(
          `${apiUrl}${endpoints.getAll}?offset=${offset * limit}&limit=${
            offset * limit + limit
          }${technology && "&technology="}${technology}`
        );

        batch(() => {
          dispatch(loadAllActionCreator(projects.list));
          dispatch(
            closeActionCreator({
              message: "",
              type: "success",
            })
          );
        });
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [dispatch]
  );

  const getById = useCallback(
    async (projectId: string): Promise<IProject | void> => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: { project },
        }: AxiosResponse<GetProjectById> = await axios.get(
          `${apiUrl}${endpoints.projectById}${projectId}`
        );

        dispatch(
          closeActionCreator({
            message: "",
            type: "success",
          })
        );

        return project as IProject;
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [dispatch]
  );

  const getByAuthor = useCallback(
    async (userId: string): Promise<Projects | void> => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: {
            projectsByAuthor: { projects },
          },
        }: AxiosResponse<UserProjects> = await axios.get(
          `${apiUrl}${endpoints.projectsByAuthor}${userId}`
        );

        dispatch(
          closeActionCreator({
            message: "",
            type: "success",
          })
        );

        if (id === userId) {
          dispatch(loadUserProjectsActionCreator(projects));
        }

        return projects;
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [dispatch, id]
  );

  const create = useCallback(
    async (project: FormData) => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: { projectCreated },
        }: AxiosResponse<NewProject> = await axios.post(
          `${apiUrl}${endpoints.createProject}`,
          project,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        batch(() => {
          dispatch(addProjectActionCreator(projectCreated));
          dispatch(addUserProjectActionCreator(projectCreated));
          dispatch(
            closeActionCreator({
              message: "Project created successfully",
              type: "success",
            })
          );
        });
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [dispatch, token]
  );

  const deleteProject = useCallback(
    async (projectId: string) => {
      dispatch(setVisibilityActionCreator(true));

      try {
        await axios.delete(`${apiUrl}${endpoints.deleteProject}${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        batch(() => {
          dispatch(deleteProjectActionCreator(projectId));
          dispatch(deleteUserProjectActionCreator(projectId));
          dispatch(setVisibilityActionCreator(false));
        });
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [token, dispatch]
  );

  const update = useCallback(
    async (project: FormData, projectId: string) => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: { projectUpdated },
        }: AxiosResponse<UpdatedProject> = await axios.put(
          `${apiUrl}${endpoints.updateProject}${projectId}`,
          project,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        batch(() => {
          dispatch(updateProjectActionCreator(projectUpdated));
          dispatch(updateUserProjectActionCreator(projectUpdated));
          dispatch(
            closeActionCreator({
              message: "Project updated successfully",
              type: "success",
            })
          );
        });
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: "No projects avaliable",
            type: "error",
          })
        );
      }
    },
    [dispatch, token]
  );

  return { getAll, getById, create, getByAuthor, deleteProject, update };
};

export default useProjects;

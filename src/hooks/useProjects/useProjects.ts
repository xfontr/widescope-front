import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import endpoints from "../../configs/endpoints";
import {
  addProjectActionCreator,
  loadAllActionCreator,
} from "../../store/slices/projects/projectsSlice";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import { loadUserProjectsActionCreator } from "../../store/slices/userData/userDataSlice";
import { IProject, Projects } from "../../types/project";
import {
  GetAllProjects,
  GetProjectById,
  NewProject,
  UserProjects,
} from "../types/useProjectTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useProjects = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.user.token);

  const getAll = useCallback(async (): Promise<void> => {
    try {
      const {
        data: { projects },
      }: AxiosResponse<GetAllProjects> = await axios.get(
        `${apiUrl}${endpoints.getAll}`
      );

      dispatch(loadAllActionCreator(projects as Projects));
    } catch (error) {
      dispatch(setVisibilityActionCreator(true));
      dispatch(
        closeActionCreator({
          message: `Error while loading projects: ${error}`,
          type: "error",
        })
      );
    }
  }, [dispatch]);

  const getById = useCallback(
    async (projectId: string): Promise<IProject | void> => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: { project },
        }: AxiosResponse<GetProjectById> = await axios.get(
          `${apiUrl}${endpoints.projectById}${projectId}`
        );

        dispatch(setVisibilityActionCreator(false));

        return project as IProject;
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: `Error while loading projects: ${error}`,
            type: "error",
          })
        );
      }
    },
    [dispatch]
  );

  const getByAuthor = useCallback(
    async (userId: string): Promise<void> => {
      try {
        dispatch(setVisibilityActionCreator(true));

        const {
          data: {
            projectsByAuthor: { projects },
          },
        }: AxiosResponse<UserProjects> = await axios.get(
          `${apiUrl}${endpoints.projectsByAuthor}${userId}`
        );

        dispatch(loadUserProjectsActionCreator(projects));
        dispatch(setVisibilityActionCreator(false));
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: `Error while getting the projects: ${error}`,
            type: "error",
          })
        );
      }
    },
    [dispatch]
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

        dispatch(addProjectActionCreator(projectCreated));
        dispatch(
          closeActionCreator({
            message: "Project created successfully",
            type: "success",
          })
        );
      } catch (error) {
        dispatch(
          closeActionCreator({
            message: `Error while creating the project: ${error}`,
            type: "error",
          })
        );
      }
    },
    [dispatch, token]
  );

  return { getAll, getById, create, getByAuthor };
};

export default useProjects;

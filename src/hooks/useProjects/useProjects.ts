import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import endpoints from "../../configs/endpoints";
import { loadAllActionCreator } from "../../store/slices/projects/projectsSlice";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import { IProject, Projects } from "../../types/project";
import { GetAllProjects, GetProjectById } from "../types/useProjectTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useProjects = () => {
  const dispatch = useAppDispatch();

  const getAll = useCallback(async (): Promise<void> => {
    try {
      dispatch(setVisibilityActionCreator(true));

      const {
        data: { projects },
      }: AxiosResponse<GetAllProjects> = await axios.get(
        `${apiUrl}${endpoints.getAll}`
      );

      dispatch(loadAllActionCreator(projects as Projects));
      dispatch(
        closeActionCreator({
          message: `Projects loaded`,
          type: "success",
        })
      );
    } catch (error) {
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

  return { getAll, getById };
};

export default useProjects;

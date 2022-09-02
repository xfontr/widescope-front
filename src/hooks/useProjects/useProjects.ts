import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import endpoints from "../../configs/endpoints";
import { loadAllActionCreator } from "../../store/slices/projects/projectsSlice";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import { Projects } from "../../types/project";
import GetAllProjects from "../types/useProjectTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useProjects = () => {
  const dispatch = useAppDispatch();

  const getAll = useCallback(async () => {
    try {
      dispatch(setVisibilityActionCreator(true));

      const {
        data: { projects },
      }: AxiosResponse<GetAllProjects> = await axios.get(
        `${apiUrl}${endpoints.getAll}`
      );

      dispatch(loadAllActionCreator(projects as Projects));
    } catch (error) {
      dispatch(
        closeActionCreator({
          message: `Error while loading projects: ${error}`,
          type: "error",
        })
      );
    }
  }, [dispatch]);

  return { getAll };
};

export default useProjects;

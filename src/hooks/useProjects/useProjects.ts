import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loadAllActionCreator } from "../../store/slices/projects/projectsSlice";
import GetAllProjects from "../types/useProjectTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useProjects = () => {
  const dispatch = useAppDispatch();

  const getAll = useCallback(async () => {
    try {
      const {
        data: { projects },
      }: AxiosResponse<GetAllProjects> = await axios.get(
        `${apiUrl}/projects/all`
      );

      if (typeof projects === "string") {
        throw new Error("No projects found");
      }

      dispatch(loadAllActionCreator(projects));
    } catch (error) {}
  }, [dispatch]);

  return { getAll };
};

export default useProjects;

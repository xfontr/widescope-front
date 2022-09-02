import { createSlice } from "@reduxjs/toolkit";
import { Projects } from "../../../types/project";

const projectsInitialState: Projects = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsInitialState,
  reducers: {
    loadAll: () => {},
  },
});

export const projectsReducer = projectsSlice.reducer;

export const { loadAll: loadAllActionCreator } = projectsSlice.actions;

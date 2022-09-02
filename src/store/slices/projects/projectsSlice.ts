import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Projects } from "../../../types/project";

const projectsInitialState: Projects = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsInitialState,
  reducers: {
    loadAll: (_, action: PayloadAction<Projects>) => action.payload,
  },
});

export const projectsReducer = projectsSlice.reducer;

export const { loadAll: loadAllActionCreator } = projectsSlice.actions;

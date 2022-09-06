import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, Projects } from "../../../types/project";

const projectsInitialState: Projects = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsInitialState,
  reducers: {
    loadAll: (_, action: PayloadAction<Projects>) => action.payload,

    addProject: (previousState, action: PayloadAction<IProject>) => [
      ...previousState,
      action.payload,
    ],

    deleteProject: (previousState, action: PayloadAction<string>) =>
      previousState.filter((project) => project.id !== action.payload),
  },
});

export const projectsReducer = projectsSlice.reducer;

export const { loadAll: loadAllActionCreator } = projectsSlice.actions;

export const { addProject: addProjectActionCreator } = projectsSlice.actions;

export const { deleteProject: deleteProjectActionCreator } =
  projectsSlice.actions;

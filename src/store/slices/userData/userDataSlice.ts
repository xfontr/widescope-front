import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, Projects } from "../../../types/project";
import { UserExtraData } from "../../../types/user";

const userDataInitialState = {} as UserExtraData;

const userDataSlice = createSlice({
  name: "userData",
  initialState: userDataInitialState,
  reducers: {
    loadUserData: (previousState, action: PayloadAction<UserExtraData>) =>
      action.payload,

    loadUserProjects: (previousState, action: PayloadAction<Projects>) => ({
      ...previousState,
      projects: action.payload,
    }),

    deleteUserProject: (previousState, action: PayloadAction<string>) => ({
      ...previousState,
      projects: previousState.projects.filter(
        (project) => project.id !== action.payload
      ),
    }),

    updateUserProject: (previousState, action: PayloadAction<IProject>) => ({
      ...previousState,
      projects: previousState.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      ),
    }),
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

export const { loadUserProjects: loadUserProjectsActionCreator } =
  userDataSlice.actions;

export const { deleteUserProject: deleteUserProjectActionCreator } =
  userDataSlice.actions;

export const { updateUserProject: updateUserProjectActionCreator } =
  userDataSlice.actions;

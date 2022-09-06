import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Projects } from "../../../types/project";
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
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

export const { loadUserProjects: loadUserProjectsActionCreator } =
  userDataSlice.actions;

export const { deleteUserProject: deleteUserProjectActionCreator } =
  userDataSlice.actions;

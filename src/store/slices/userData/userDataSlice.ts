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
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

export const { loadUserProjects: loadUserProjectsActionCreator } =
  userDataSlice.actions;

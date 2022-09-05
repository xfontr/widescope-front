import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Projects } from "../../../types/project";
import { UserExtraData } from "../../../types/user";

const userDataInitialState = {
  userData: {} as UserExtraData,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: userDataInitialState,
  reducers: {
    loadUserData: (previousState, action: PayloadAction<UserExtraData>) => ({
      ...previousState,
      userData: action.payload,
    }),

    loadUserProjects: (previousState, action: PayloadAction<Projects>) => ({
      ...previousState,
      userData: { ...previousState.userData, projects: action.payload },
    }),
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

export const { loadUserProjects: loadUserProjectsActionCreator } =
  userDataSlice.actions;

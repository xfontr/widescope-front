import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IContact from "../../../types/IContact";
import { IProject, Projects } from "../../../types/project";
import { UserExtraData } from "../../../types/user";

const userDataInitialState = {
  email: "",
  friends: [],
  projects: [],
} as UserExtraData;

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

    addUserProject: (previousState, action: PayloadAction<IProject>) => ({
      ...previousState,
      projects: [...previousState.projects, action.payload],
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

    addFriend: (
      previousState,
      action: PayloadAction<Omit<IContact, "isFriend">>
    ) => ({
      ...previousState,
      friends: [...previousState.friends, action.payload],
    }),
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

export const { loadUserProjects: loadUserProjectsActionCreator } =
  userDataSlice.actions;

export const { addUserProject: addUserProjectActionCreator } =
  userDataSlice.actions;

export const { deleteUserProject: deleteUserProjectActionCreator } =
  userDataSlice.actions;

export const { updateUserProject: updateUserProjectActionCreator } =
  userDataSlice.actions;

export const { addFriend: addFriendActionCreator } = userDataSlice.actions;

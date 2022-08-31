import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserExtraData } from "../../types/user";

const userDataInitialState = {
  userData: {} as UserExtraData,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: userDataInitialState,
  reducers: {
    loadUserData: (previousState, action: PayloadAction<IUser>) => ({
      ...previousState,
      userData: action.payload,
    }),
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { loadUserData: loadUserDataActionCreator } =
  userDataSlice.actions;

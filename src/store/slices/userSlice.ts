import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

const userInitialState = {
  isLogged: false,
  user: {} as IUser,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    toggleStatus: (previousState) => ({
      ...previousState,
      isLogged: !previousState.isLogged,
    }),

    signIn: (previousState, action: PayloadAction<IUser>) => ({
      ...previousState,
      user: action.payload,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { signIn: signInActionCreator } = userSlice.actions;
export const { toggleStatus: toggleStatusActionCreator } = userSlice.actions;

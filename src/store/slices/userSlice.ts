import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

const userInitialState = {} as IUser;

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    signIn: (_, action: PayloadAction<IUser>) => action.payload,
  },
});

export const userReducer = userSlice.reducer;

export const { signIn: SignInActionCreator } = userSlice.actions;

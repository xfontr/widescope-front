import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserExtraData } from "../../types/user";

const userInitialState = {
  isLogged: false,
  user: {} as UserExtraData,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    toggleStatus: (previousState) => ({
      ...previousState,
      isLogged: !previousState.isLogged,
    }),

    loadUser: (previousState, action: PayloadAction<IUser>) => ({
      ...previousState,
      user: action.payload,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { loadUser: loadUserActionCreator } = userSlice.actions;
export const { toggleStatus: toggleStatusActionCreator } = userSlice.actions;

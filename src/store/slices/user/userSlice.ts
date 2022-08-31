import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBasicData } from "../../../types/user";

const userInitialState = {
  isLogged: false,
  user: {} as UserBasicData,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    toggleStatus: (previousState) => ({
      ...previousState,
      isLogged: !previousState.isLogged,
    }),

    loadUser: (previousState, action: PayloadAction<UserBasicData>) => ({
      ...previousState,
      user: action.payload,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { loadUser: loadUserActionCreator } = userSlice.actions;
export const { toggleStatus: toggleStatusActionCreator } = userSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBasicData } from "../../../types/user";
import setUserState from "../../../utils/setUserState/setUserState";

const userSlice = createSlice({
  name: "user",
  initialState: setUserState(),
  reducers: {
    toggleStatus: (previousState, action: PayloadAction<boolean>) => ({
      ...previousState,
      isLogged: action.payload,
    }),

    loadUser: (previousState, action: PayloadAction<UserBasicData>) => ({
      ...previousState,
      user: action.payload,
    }),

    logOut: () => setUserState(),
  },
});

export const userReducer = userSlice.reducer;

export const { loadUser: loadUserActionCreator } = userSlice.actions;
export const { toggleStatus: toggleStatusActionCreator } = userSlice.actions;
export const { logOut: logOutActionCreator } = userSlice.actions;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userDataReducer } from "../store/slices/userData/userDataSlice";
import { userReducer } from "../store/slices/user/userSlice";
import { uiModalReducer } from "../store/slices/uiModal/uiModalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
    uiModal: uiModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

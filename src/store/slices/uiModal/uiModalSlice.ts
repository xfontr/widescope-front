import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const uiModalInitialState = {
  isVisible: false,
  message: "",
  type: "loading",
};

const uiModalSlice = createSlice({
  name: "uiModal",
  initialState: uiModalInitialState,
  reducers: {
    toggleVisibility: (previousState, action: PayloadAction<boolean>) => ({
      ...previousState,
      isVisible: action.payload,
    }),

    setMessage: (previousState, action: PayloadAction<string>) => ({
      ...previousState,
      message: action.payload,
    }),
  },
});

export const uiModalReducer = uiModalSlice.reducer;

export const { toggleVisibility: toggleVisibilityActionCreator } =
  uiModalSlice.actions;

export const { setMessage: setMessageActionCreator } = uiModalSlice.actions;

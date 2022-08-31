import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalTypes = "loading" | "error" | "success";

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

    setType: (previousState, action: PayloadAction<ModalTypes>) => ({
      ...previousState,
      type: action.payload,
    }),
  },
});

export const uiModalReducer = uiModalSlice.reducer;

export const { toggleVisibility: toggleVisibilityActionCreator } =
  uiModalSlice.actions;

export const { setMessage: setMessageActionCreator } = uiModalSlice.actions;

export const { setType: setTypeActionCreator } = uiModalSlice.actions;

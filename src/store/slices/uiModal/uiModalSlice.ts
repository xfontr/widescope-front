import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalTypes = "loading" | "error" | "success";

const uiModalInitialState = {
  isClosing: false,
  isVisible: false,
  message: "",
  type: "loading",
};

const uiModalSlice = createSlice({
  name: "uiModal",
  initialState: uiModalInitialState,
  reducers: {
    setVisibility: (previousState, action: PayloadAction<boolean>) => ({
      ...previousState,
      isVisible: action.payload,
    }),

    close: (previousState, action: PayloadAction<boolean>) => ({
      ...previousState,
      isClosing: action.payload,
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

export const { setVisibility: setVisibilityActionCreator } =
  uiModalSlice.actions;

export const { setMessage: setMessageActionCreator } = uiModalSlice.actions;

export const { setType: setTypeActionCreator } = uiModalSlice.actions;

export const { close: closeActionCreator } = uiModalSlice.actions;

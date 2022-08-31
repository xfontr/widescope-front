import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClosePayload, ModalTypes } from "../../../types/modal";

const uiModalInitialState = {
  isClosing: false,
  isVisible: false,
  message: "",
  type: "loading" as ModalTypes,
};

const uiModalSlice = createSlice({
  name: "uiModal",
  initialState: uiModalInitialState,
  reducers: {
    close: (previousState, action: PayloadAction<ClosePayload>) => ({
      ...previousState,
      isClosing: true,
      message: action.payload.message,
      type: action.payload.type,
    }),

    setVisibility: (previousState, action: PayloadAction<boolean>) => ({
      ...previousState,
      isVisible: action.payload,
      message: "Loading",
      type: "loading",
    }),
  },
});

export const uiModalReducer = uiModalSlice.reducer;

export const { setVisibility: setVisibilityActionCreator } =
  uiModalSlice.actions;

export const { close: closeActionCreator } = uiModalSlice.actions;

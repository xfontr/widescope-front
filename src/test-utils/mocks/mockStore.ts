import { configureStore, createReducer } from "@reduxjs/toolkit";
import { ModalTypes } from "../../types/modal";
import { Projects } from "../../types/project";
import { UserExtraData } from "../../types/user";
import { mockUserBasicData, mockUserExtraData } from "./mockUserData";

const userInitialState = { user: mockUserBasicData, isLogged: true };

const mockUserReducer = createReducer<typeof userInitialState>(
  userInitialState,
  (builder) => {
    builder.addDefaultCase((state: typeof userInitialState) => state);
  }
);

const mockUserDataReducer = createReducer<UserExtraData>(
  mockUserExtraData,
  (builder) => {
    builder.addDefaultCase((state: UserExtraData) => state);
  }
);

const uiModalInitialState = {
  isClosing: false,
  isVisible: false,
  message: "",
  type: "loading" as ModalTypes,
};

const mockUiReducer = createReducer(uiModalInitialState, (builder) => {
  builder.addDefaultCase((state) => state);
});

const projectsInitialState = [] as Projects;

const mockProjectsReducer = createReducer(projectsInitialState, (builder) => {
  builder.addDefaultCase((state) => state);
});

const mockStore = configureStore({
  reducer: {
    user: mockUserReducer,
    userData: mockUserDataReducer,
    uiModal: mockUiReducer,
    projects: mockProjectsReducer,
  },
});

export default mockStore;

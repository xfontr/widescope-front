import mockProject from "../../../test-utils/mocks/mockProject";
import { mockUserExtraData } from "../../../test-utils/mocks/mockUserData";
import { UserExtraData } from "../../../types/user";
import {
  loadUserDataActionCreator,
  loadUserProjectsActionCreator,
  userDataReducer,
} from "./userDataSlice";

describe("Given a loadUserDataActionCreator", () => {
  describe("When called with a user as a payload", () => {
    test("Then it should return an action with a type 'userData/signIn' and the user as payload", () => {
      const actionType = "userData/loadUserData";
      const expectedAction = {
        type: actionType,
        payload: mockUserExtraData,
      };

      const action = loadUserDataActionCreator(mockUserExtraData);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a loadUserProjectsActionCreator", () => {
  describe("When called with a list of projects as a payload", () => {
    test("Then it should return an action with a type userData/loadUserProjects and said list as payload", () => {
      const actionType = "userData/loadUserProjects";
      const expectedAction = {
        type: actionType,
        payload: [mockProject],
      };

      const action = loadUserProjectsActionCreator([mockProject]);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a userDataReducer function", () => {
  describe("When called with a loadUser action with a new user as a payload", () => {
    test("Then it should replace the previous user with the passed one", () => {
      const previousState = { userData: {} as UserExtraData };
      const expectedResult = {
        ...previousState,
        userData: mockUserExtraData,
      };
      const action = loadUserDataActionCreator(mockUserExtraData);

      const result = userDataReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a loadUserProjects action with a list of projects as a payload", () => {
    test("Then it should replace the previous user project list with the passed one", () => {
      const previousState = { userData: mockUserExtraData };
      const expectedResult = {
        ...previousState,
        userData: {
          ...mockUserExtraData,
          projects: [mockProject, mockProject],
        },
      };
      const action = loadUserProjectsActionCreator([mockProject, mockProject]);

      const result = userDataReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

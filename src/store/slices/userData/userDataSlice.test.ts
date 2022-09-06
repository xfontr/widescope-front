import mockProject from "../../../test-utils/mocks/mockProject";
import { mockUserExtraData } from "../../../test-utils/mocks/mockUserData";
import { Projects } from "../../../types/project";
import { UserExtraData } from "../../../types/user";
import {
  deleteUserProjectActionCreator,
  loadUserDataActionCreator,
  loadUserProjectsActionCreator,
  updateUserProjectActionCreator,
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

describe("Given a deleteUserProject function", () => {
  describe("When called with a project id as a payload", () => {
    test("Then it should return an action with a type userData/deleteUserProject and said id as payload", () => {
      const actionType = "userData/deleteUserProject";
      const expectedAction = {
        type: actionType,
        payload: mockProject.id,
      };

      const action = deleteUserProjectActionCreator(mockProject.id);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a updateUserProjectActionCreator function", () => {
  describe("When called with a project as a payload", () => {
    test("Then it should return an action with a type 'userData/updateUserProject' and said project as payload", () => {
      const actionType = "userData/updateUserProject";
      const expectedAction = {
        type: actionType,
        payload: mockProject,
      };

      const action = updateUserProjectActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a userDataReducer function", () => {
  describe("When called with a loadUser action with a new user as a payload", () => {
    test("Then it should replace the previous user with the passed one", () => {
      const previousState = {} as UserExtraData;
      const expectedResult = mockUserExtraData;

      const action = loadUserDataActionCreator(mockUserExtraData);

      const result = userDataReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a loadUserProjects action with a list of projects as a payload", () => {
    test("Then it should replace the previous user project list with the passed one", () => {
      const previousState = mockUserExtraData;
      const expectedResult = {
        ...mockUserExtraData,
        projects: [mockProject, mockProject],
      };
      const action = loadUserProjectsActionCreator([mockProject, mockProject]);

      const result = userDataReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a deleteUserProject action with a project id as a payload", () => {
    test("Then it should delete the project from the list of projects", () => {
      const previousState = mockUserExtraData;
      const expectedResult = {
        ...mockUserExtraData,
        projects: [],
      };
      const action = deleteUserProjectActionCreator(mockProject.id);

      const result = userDataReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a updateUserProject action", () => {
    test("Then it should update the project in the state that matches payload's object", () => {
      const initialState = mockUserExtraData;

      const expectedResult = {
        ...mockUserExtraData,
        projects: [{ ...mockProject, name: "Updated project" }],
      };

      const action = updateUserProjectActionCreator({
        ...mockProject,
        name: "Updated project",
      });

      const result = userDataReducer(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

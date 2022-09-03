import mockProject from "../../../test-utils/mocks/mockProject";
import { Projects } from "../../../types/project";
import {
  addProjectActionCreator,
  loadAllActionCreator,
  projectsReducer,
} from "./projectsSlice";

describe("Given a loadAllActionCreator function", () => {
  describe("When called with an array of projects as a payload", () => {
    test("Then it should return an action with a type 'projects/loadAll' and an array of projects as payload", () => {
      const actionType = "projects/loadAll";
      const expectedAction = {
        type: actionType,
        payload: [mockProject],
      };

      const action = loadAllActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a addProjectActionCreator function", () => {
  describe("When called with a project as payload", () => {
    test("Then it should return an action with a type 'projects/addProject' and an said as payload", () => {
      const actionType = "projects/addProject";
      const expectedAction = {
        type: actionType,
        payload: mockProject,
      };

      const action = addProjectActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a projectsReducer function", () => {
  describe("When called with a loadAll action", () => {
    test("Then it should replace the previous users with the passed ones", () => {
      const initialState = [{ ...mockProject, name: "False name" }] as Projects;

      const expectedResult = [mockProject];
      const action = loadAllActionCreator([mockProject]);

      const result = projectsReducer(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a addProject action", () => {
    test("Then it should add a project to the previousState", () => {
      const initialState = [{ ...mockProject, name: "False name" }] as Projects;

      const expectedResult = [
        { ...mockProject, name: "False name" },
        mockProject,
      ];
      const action = addProjectActionCreator(mockProject);

      const result = projectsReducer(initialState, action);

      expect(result).toStrictEqual(expectedResult);
      expect(result).toHaveLength(2);
    });
  });
});

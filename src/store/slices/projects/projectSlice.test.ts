import mockProject from "../../../test-utils/mocks/mockProject";
import { Projects } from "../../../types/project";
import { loadAllActionCreator, projectsReducer } from "./projectsSlice";

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

describe("Given a projectsReducer function", () => {
  const initialState = [] as Projects;

  describe("When called with a loadAll action", () => {
    test("Then it should replace the previous user with the passed one", () => {
      const expectedResult = [mockProject];
      const action = loadAllActionCreator([mockProject]);

      const result = projectsReducer(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

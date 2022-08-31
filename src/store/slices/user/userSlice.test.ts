import { mockUserBasicData } from "../../../test-utils/mocks/mockUserData";
import { UserBasicData } from "../../../types/user";
import {
  loadUserActionCreator,
  toggleStatusActionCreator,
  userReducer,
} from "./userSlice";

describe("Given a toggle status action creator", () => {
  describe("When called", () => {
    test("Then it should return an action with a type 'user/toggleStatus'", () => {
      const actionType = "user/toggleStatus";
      const expectedAction = {
        type: actionType,
        payload: true,
      };

      const action = toggleStatusActionCreator(true);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a loadUser action creator", () => {
  describe("When called with user data as a payload", () => {
    test("Then it should return an action with a type 'user/loadUser' and said user as payload", () => {
      const actionType = "user/loadUser";
      const expectedAction = {
        type: actionType,
        payload: mockUserBasicData,
      };

      const action = loadUserActionCreator(mockUserBasicData);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a userReducer function", () => {
  const previousState = { isLogged: false, user: {} as UserBasicData };

  describe("When called with a toggleStatus action", () => {
    test("Then it should return toggle 'isLogged' from false to true", () => {
      const expectedResult = {
        ...previousState,
        isLogged: true,
      };
      const action = toggleStatusActionCreator(true);

      const result = userReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a loadUser action", () => {
    test("Then it should change the user previous data to the new one", () => {
      const expectedResult = {
        ...previousState,
        user: mockUserBasicData,
      };
      const action = loadUserActionCreator(mockUserBasicData);

      const result = userReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

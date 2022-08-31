import mockUser from "../../test-utils/mocks/mockUser";
import { IUser } from "../../types/user";
import {
  signInActionCreator,
  toggleStatusActionCreator,
  userReducer,
} from "./userDataSlice";

describe("Given a signInUser action creator", () => {
  describe("When called with a user as a payload", () => {
    test("Then it should return an action with a type 'user/signIn' and the user as payload", () => {
      const actionType = "user/signIn";
      const expectedAction = {
        type: actionType,
        payload: mockUser,
      };

      const action = signInActionCreator(mockUser);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a toggle status action creator", () => {
  describe("When called", () => {
    test("Then it should return an action with a type 'user/toggleStatus'", () => {
      const actionType = "user/toggleStatus";
      const expectedAction = {
        type: actionType,
        payload: undefined,
      };

      const action = toggleStatusActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a userReducer function", () => {
  const previousState = { user: {} as IUser, isLogged: false };

  describe("When called with a signUp action with a new user as a payload", () => {
    test("Then it should replace the previous user with the passed one", () => {
      const expectedResult = {
        ...previousState,
        user: mockUser,
      };
      const action = signInActionCreator(mockUser);

      const result = userReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a toggleStatus action", () => {
    test("Then it should return toggle 'isLogged' from false to true", () => {
      const expectedResult = {
        ...previousState,
        isLogged: true,
      };
      const action = toggleStatusActionCreator();

      const result = userReducer(previousState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

import mockUser from "../../test-utils/mocks/mockUser";
import { signInActionCreator, userReducer } from "./userSlice";

describe("Given a signInUser action creator", () => {
  describe("When called with a user as a payload", () => {
    test("Then it should return an action with a type 'asdfasdf' and the user as payload", () => {
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

describe("Given a userReducer function", () => {
  describe("When called with a signUp action with a new user as a payload", () => {
    test("Then it should return a new user", () => {
      const previousState = { user: mockUser, isLogged: true };
      const action = signInActionCreator(mockUser);

      const result = userReducer(previousState, action);
      expect(result).toStrictEqual(previousState);
    });
  });
});

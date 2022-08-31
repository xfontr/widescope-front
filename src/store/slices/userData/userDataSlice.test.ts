import { mockUserExtraData } from "../../../test-utils/mocks/mockUserData";
import { UserExtraData } from "../../../types/user";
import { loadUserDataActionCreator, userDataReducer } from "./userDataSlice";

describe("Given a loadUserData action creator", () => {
  describe("When called with a user as a payload", () => {
    test("Then it should return an action with a type 'user/signIn' and the user as payload", () => {
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

describe("Given a userDataReducer function", () => {
  describe("When called with a loadUserData action with a new user as a payload", () => {
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
});

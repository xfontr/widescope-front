import mockLocalStorage from "../../test-utils/mocks/mockLocalStorage";
import mockUser from "../../test-utils/mocks/mockUser";
import setUserState from "./setUserState";

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

let mockTokenContent = {
  id: mockUser.id,
  name: mockUser.name,
} as unknown;

jest.mock("../auth/auth", () => () => mockTokenContent);

describe("Given a setUserState function", () => {
  describe("When called and there is a valid token at the local storage", () => {
    test("Then it should return a initial state for the user with its data", () => {
      const tokenContent = "###";
      mockLocalStorage.setItem("token", tokenContent);

      const expectedState = {
        isLogged: true,
        user: { id: mockUser.id, name: mockUser.name, token: tokenContent },
      };

      const result = setUserState();

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe("When called with an no token at the local storage", () => {
    test("Then it should return an initial state for the user with undefined values", () => {
      const tokenContent = "";
      mockLocalStorage.setItem("token", tokenContent);
      mockTokenContent = undefined;

      const expectedState = {
        isLogged: false,
        user: {
          id: undefined,
          name: undefined,
          token: undefined,
        },
      };

      const result = setUserState();

      expect(result).toStrictEqual(expectedState);
    });
  });
});

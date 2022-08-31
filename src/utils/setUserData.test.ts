import mockUser from "../test-utils/mocks/mockUser";
import {
  mockUserBasicData,
  mockUserExtraData,
} from "../test-utils/mocks/mockUserData";
import { setUserBasicData, setUserExtraData } from "./setUserData";

describe("Given a setUserBasicData function", () => {
  describe("When called with a user as an argument", () => {
    test("Then it should return only the id, name and an empty token", () => {
      const expectedResult = { ...mockUserBasicData, token: "" };

      const result = setUserBasicData(mockUser);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a setUserExtraData function", () => {
  describe("When called with a user as an argument", () => {
    test("Then it should return only the email an friends of the user", () => {
      const expectedResult = mockUserExtraData;

      const result = setUserExtraData(mockUser);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

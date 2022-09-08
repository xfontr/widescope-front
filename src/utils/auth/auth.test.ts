import jwt_decode from "jwt-decode";
import getTokenData from "./auth";

jest.mock("jwt-decode");

describe("Given a getTokenData function", () => {
  describe("When called with a token (string) as an argument", () => {
    test("Then it should call a jwt decode function and return its value", () => {
      const token = "########";

      getTokenData(token);

      expect(jwt_decode).toHaveBeenCalledWith(token);
    });
  });
});

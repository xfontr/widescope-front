import mockLocalStorage from "../mocks/mockLocalStorage";

describe("Given a mockLocalStorage variable", () => {
  describe("When called", () => {
    test("Then it should return an object with a setItem function", () => {
      const { setItem } = mockLocalStorage;

      expect(setItem).not.toBeNull();
    });

    test("Said function, when called with two arguments, should return nothing", () => {
      const { setItem } = mockLocalStorage;

      const result = setItem("", "");

      expect(result).toBeUndefined();
    });
  });
});

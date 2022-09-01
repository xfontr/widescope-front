import mockLocalStorage from "../mocks/mockLocalStorage";

describe("Given a mockLocalStorage variable", () => {
  describe("When called with its returned function setItem", () => {
    test("Said function should not be null and do nothing", () => {
      const { setItem } = mockLocalStorage;

      expect(setItem).not.toBeNull();
    });

    test("Said function, when called with two arguments, should return nothing", () => {
      const { setItem } = mockLocalStorage;

      const result = setItem("", "");

      expect(result).toBeUndefined();
    });

    describe("When called with its returned function clear", () => {
      test("Said function should not be null and do nothing", () => {
        const { clear } = mockLocalStorage;

        const result = clear();

        expect(clear).not.toBeNull();
        expect(result).toBeUndefined();
      });
    });
  });
});

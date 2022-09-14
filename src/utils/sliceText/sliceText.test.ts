import sliceText from "./sliceText";

describe("Given a sliceText function", () => {
  describe("When called with a text '1234' and a number '2' as arguments", () => {
    test("Then it should return '12...'", () => {
      const text = "1234";
      const maxLength = 2;

      const expexctedResult = "12...";

      const result = sliceText(text, maxLength);

      expect(result).toBe(expexctedResult);
    });
  });

  describe("When called with a text '1234' and a number '5' as arguments", () => {
    test("Then it should return the exact same text", () => {
      const text = "1234";
      const maxLength = 5;

      const result = sliceText(text, maxLength);

      expect(result).toBe(text);
    });
  });
});

import { toggleVisibilityActionCreator, uiModalReducer } from "./uiModalSlice";

describe("Given a toggle visibility action creator", () => {
  describe("When called", () => {
    test("Then it should return an action with a type 'uiModal/toggleVisibility'", () => {
      const expectedResult = {
        type: "uiModal/toggleVisibility",
        payload: true,
      };

      const result = toggleVisibilityActionCreator(true);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a uiModalReducer function", () => {
  const previousState = { isVisible: false, message: "", type: "loading" };

  describe("When called with a toggleVisibility action with true as payload", () => {
    test("Then it should return 'isVisible' from false to true", () => {
      const expectedResult = {
        ...previousState,
        isVisible: true,
      };

      const result = uiModalReducer(
        previousState,
        toggleVisibilityActionCreator(true)
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

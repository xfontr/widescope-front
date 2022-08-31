import {
  setMessageActionCreator,
  setTypeActionCreator,
  toggleVisibilityActionCreator,
  uiModalReducer,
} from "./uiModalSlice";

describe("Given a toggle visibility action creator", () => {
  describe("When called with true as an argument", () => {
    test("Then it should return an action with a type 'uiModal/toggleVisibility' and true as payload", () => {
      const expectedResult = {
        type: "uiModal/toggleVisibility",
        payload: true,
      };

      const result = toggleVisibilityActionCreator(true);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a setMessageActionCreator function", () => {
  describe("When called with a message 'Message'", () => {
    test("Then it should return an action with type 'uiModal/setMessage' and the message as payload", () => {
      const message = "Message";
      const expectedResult = {
        type: "uiModal/setMessage",
        payload: message,
      };

      const result = setMessageActionCreator(message);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a setTypeActionCreator function", () => {
  describe("When called with the type 'error'", () => {
    test("Then it should return an action with type 'uiModal/setType' and the type as payload", () => {
      const type = "error";
      const expectedResult = {
        type: "uiModal/setType",
        payload: type,
      };

      const result = setTypeActionCreator(type);

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

  describe("When called with a setMessage action with 'Message' as payload", () => {
    test("Then it should return the previous state with the message passed", () => {
      const expectedResult = {
        ...previousState,
        message: "Message",
      };

      const result = uiModalReducer(
        previousState,
        setMessageActionCreator(expectedResult.message)
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a setType action with 'error' as payload", () => {
    test("Then it should return the previous state with the said type", () => {
      const type = "error";
      const expectedResult = {
        ...previousState,
        type,
      };

      const result = uiModalReducer(previousState, setTypeActionCreator(type));

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

import {
  closeActionCreator,
  setMessageActionCreator,
  setTypeActionCreator,
  setVisibilityActionCreator,
  uiModalReducer,
} from "./uiModalSlice";

describe("Given a setVisibilityActionCreator function", () => {
  describe("When called with true as an argument", () => {
    test("Then it should return an action with a type 'uiModal/setVisibility' and true as payload", () => {
      const expectedResult = {
        type: "uiModal/setVisibility",
        payload: true,
      };

      const result = setVisibilityActionCreator(true);

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

describe("Given a loadActionCreator function", () => {
  describe("When called with a payload of true", () => {
    test("Then it should return an action with type 'uiModal/close' and true as payload", () => {
      const expectedResult = {
        type: "uiModal/close",
        payload: true,
      };

      const result = closeActionCreator(true);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a uiModalReducer function", () => {
  const previousState = {
    isClosing: false,
    isVisible: false,
    message: "",
    type: "loading",
  };

  describe("When called with a toggleVisibility action with true as payload", () => {
    test("Then it should return 'isVisible' from false to true", () => {
      const expectedResult = {
        ...previousState,
        isVisible: true,
      };

      const result = uiModalReducer(
        previousState,
        setVisibilityActionCreator(true)
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

  describe("When called with a load action with true as payload", () => {
    test("Then it should return the previous state with load as true", () => {
      const expectedResult = {
        ...previousState,
        isClosing: true,
      };

      const result = uiModalReducer(previousState, closeActionCreator(true));

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

import { ModalTypes } from "../../../types/modal";
import {
  closeActionCreator,
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

describe("Given a closeActionCreator function", () => {
  describe("When called with a message 'Message' and a type 'error'", () => {
    test("Then it should return an action with a type 'uiModal/close' and said data as payload", () => {
      const expectedResult = {
        type: "uiModal/close",
        payload: { message: "Message", type: "error" },
      };

      const result = closeActionCreator({ message: "Message", type: "error" });

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a uiModalReducer function", () => {
  const previousState = {
    isClosing: false,
    isVisible: false,
    message: "",
    type: "loading" as ModalTypes,
  };

  describe("When called with a setVisibility action with true as payload", () => {
    test("Then it should return 'isVisible' from false to true, and set message as 'Loading'", () => {
      const expectedResult = {
        ...previousState,
        message: "Loading",
        isVisible: true,
      };

      const result = uiModalReducer(
        previousState,
        setVisibilityActionCreator(true)
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a close action with a message 'Message' and a type 'error'", () => {
    test("Then it should return the previous state with the message and type passed, and with isSlosing true", () => {
      const expectedResult = {
        ...previousState,
        isClosing: true,
        message: "Message",
        type: "error",
      };

      const result = uiModalReducer(
        previousState,
        closeActionCreator({ message: expectedResult.message, type: "error" })
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

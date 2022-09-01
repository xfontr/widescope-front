import { renderHook, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useAppDispatch } from "../../app/hooks";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import styledMainTheme from "../../styles/styledMainTheme";
import { render } from "../../test-utils/render/customRender";
import { Wrapper } from "../../test-utils/render/Wrapper";
import Modal from "./Modal";

jest.useFakeTimers();

describe("Given a Modal component", () => {
  describe("When instantiated with store states of visible and 'Loading' message", () => {
    test("Then it should show a 'Message' with the main typography color", () => {
      const expectedMessage = "Loading";
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
      });

      render(<Modal />);

      const shownMessage = screen.getByText(expectedMessage);

      expect(shownMessage).toBeInTheDocument();
      expect(shownMessage).toHaveStyle("color: inherit");
    });
  });

  describe("When instantiated with store states of closing, message 'Message' and type 'error'", () => {
    test("Then it should show a 'Message' with color red", () => {
      const message = "Message";
      const type = "error";

      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(closeActionCreator({ message, type }));
      });

      render(<Modal />);

      const shownMessage = screen.getByText(message);

      expect(shownMessage).toBeInTheDocument();
      expect(shownMessage).toHaveStyle(
        `color: ${styledMainTheme.colors.error}`
      );
    });
  });

  describe("When instantiated with store states of closing, message 'Message' and type 'success'", () => {
    test("Then it should show a 'Message' with color green", () => {
      const message = "Message";
      const type = "success";

      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(closeActionCreator({ message, type }));
      });

      render(<Modal />);

      const shownMessage = screen.getByText(message);

      expect(shownMessage).toBeInTheDocument();
      expect(shownMessage).toHaveStyle(
        `color: ${styledMainTheme.colors.success}`
      );
    });
  });

  describe("When instantiated with a state of not visible", () => {
    test("Then it should not be visible", () => {
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(false));
      });

      render(<Modal />);

      const modal = screen.queryByTestId("modal");

      expect(modal).not.toBeInTheDocument();
    });
  });

  describe("When instantiated with a state of visible and closing", () => {
    test("Then it should not be visible after 2300ms", async () => {
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(closeActionCreator({ message: "", type: "error" }));
      });

      render(<Modal />);

      const modal = screen.getByTestId("modal");

      expect(modal).toBeInTheDocument();

      await jest.advanceTimersByTime(2300);

      expect(modal).not.toBeInTheDocument();
    });
  });
});

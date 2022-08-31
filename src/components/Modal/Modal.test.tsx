import { renderHook, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useAppDispatch } from "../../app/hooks";
import {
  closeActionCreator,
  setMessageActionCreator,
  setTypeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import styledMainTheme from "../../styles/styledMainTheme";
import { render } from "../../test-utils/render/customRender";
import Wrapper from "../../test-utils/render/Wrapper";
import Modal from "./Modal";

jest.useFakeTimers();

describe("Given a Modal component", () => {
  describe("When instantiated with store states of visible, 'loading' and 'Message'", () => {
    test("Then it should show a 'Message' with the main typography color", () => {
      const message = "Message";
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(setTypeActionCreator("loading"));
        dispatch(setMessageActionCreator(message));
      });

      render(<Modal />);

      const shownMessage = screen.getByText(message);

      expect(shownMessage).toBeInTheDocument();
      expect(shownMessage).toHaveStyle("color: inherit");
    });
  });

  describe("When instantiated with store states of visible, 'error' and 'Message'", () => {
    test("Then it should show a 'Message' with color red", () => {
      const message = "Message";
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(setTypeActionCreator("error"));
        dispatch(setMessageActionCreator(message));
      });

      render(<Modal />);

      const shownMessage = screen.getByText(message);

      expect(shownMessage).toBeInTheDocument();
      expect(shownMessage).toHaveStyle(
        `color: ${styledMainTheme.colors.error}`
      );
    });
  });

  describe("When instantiated with store states of visible, 'success' and 'Message'", () => {
    test("Then it should show a 'Message' with color green", () => {
      const message = "Message";
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(setTypeActionCreator("success"));
        dispatch(setMessageActionCreator(message));
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

  describe("When instantiated with a state of visible and loading", () => {
    test("Then it should not be visible after 2300ms", async () => {
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(setVisibilityActionCreator(true));
        dispatch(closeActionCreator(true));
      });

      render(<Modal />);

      const modal = screen.getByTestId("modal");

      expect(modal).toBeInTheDocument();

      await jest.advanceTimersByTime(2300);

      expect(modal).not.toBeInTheDocument();
    });
  });
});

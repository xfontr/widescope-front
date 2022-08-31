import { renderHook, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useAppDispatch } from "../../app/hooks";
import {
  setMessageActionCreator,
  setTypeActionCreator,
  toggleVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import styledMainTheme from "../../styles/styledMainTheme";
import { render } from "../../test-utils/render/customRender";
import Wrapper from "../../test-utils/render/Wrapper";
import Modal from "./Modal";

describe("Given a Modal component", () => {
  describe("When instantiated with store states of visible, 'loading' and 'Message'", () => {
    test("Then it should show a 'Message' with the main typography color", () => {
      const message = "Message";
      const {
        result: { current: dispatch },
      } = renderHook(useAppDispatch, { wrapper: Wrapper });

      act(() => {
        dispatch(toggleVisibilityActionCreator(true));
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
        dispatch(toggleVisibilityActionCreator(true));
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
        dispatch(toggleVisibilityActionCreator(true));
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
        dispatch(toggleVisibilityActionCreator(false));
      });

      render(<Modal />);

      const modal = screen.queryByTestId("modal");

      expect(modal).not.toBeInTheDocument();
    });
  });
});

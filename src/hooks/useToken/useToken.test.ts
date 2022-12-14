import { waitFor, renderHook as reactRenderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setVisibilityActionCreator } from "../../store/slices/uiModal/uiModalSlice";
import { loadUserActionCreator } from "../../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../../store/slices/userData/userDataSlice";
import mockLocalStorage from "../../test-utils/mocks/mockLocalStorage";
import mockUseDispatch from "../../test-utils/mocks/mockUseAppDispatch";
import mockUser from "../../test-utils/mocks/mockUser";
import { renderHook } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import { IUser } from "../../types/user";
import {
  setUserBasicData,
  setUserExtraData,
} from "../../utils/setUserData/setUserData";
import useToken from "./useToken";

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

let mockTokenContent = {
  id: mockUser.id,
  name: mockUser.name,
};

jest.mock("../../utils/auth/auth", () => () => mockTokenContent);

describe("Given a verifyUser function returned from a useToken function", () => {
  const {
    result: { current: verifyUser },
  } = renderHook(useToken);

  const tokenContent = "###";

  describe("When called with a valid token in the localStorage", () => {
    test("Then it should log the user in", async () => {
      mockLocalStorage.setItem("token", tokenContent);

      await act(async () => {
        await verifyUser();
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          loadUserActionCreator(
            setUserBasicData(mockUser as IUser, tokenContent)
          )
        );
      });

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserDataActionCreator(setUserExtraData(mockUser as IUser))
      );
    });

    test("Then it should dispatch the ui modal actions", async () => {
      await act(async () => {
        mockLocalStorage.setItem("token", tokenContent);
        await verifyUser();
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          setVisibilityActionCreator(true)
        );
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          setVisibilityActionCreator(false)
        );
      });
    });
  });

  describe("When called with an invalid token in the localStorage", () => {
    test("Then it should clear the local storage", async () => {
      mockLocalStorage.setItem("token", tokenContent);
      localStorage.clear = jest.fn();

      mockTokenContent = {
        id: "falseId",
      } as typeof mockTokenContent;

      await act(async () => {
        await verifyUser();
      });

      await waitFor(() => {
        expect(localStorage.clear).toHaveBeenCalled();
      });
    });
  });

  describe("When called and the user is already logged in", () => {
    const {
      result: { current: getTokenLoggedOut },
    } = reactRenderHook(useToken, { wrapper: WrapperWithMockStore });

    test("Then it should not log the user again", async () => {
      await act(async () => {
        await getTokenLoggedOut();
      });

      await waitFor(() => {
        expect(mockUseDispatch).not.toHaveBeenCalled();
      });
    });
  });
});

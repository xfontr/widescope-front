import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import { loadUserActionCreator } from "../../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../../store/slices/userData/userDataSlice";
import mockLocalStorage from "../../test-utils/mocks/mockLocalStorage";
import mockUser from "../../test-utils/mocks/mockUser";
import { Wrapper } from "../../test-utils/render/Wrapper";
import { IUser } from "../../types/user";
import { setUserBasicData, setUserExtraData } from "../../utils/setUserData";
import useToken from "./useToken";

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../utils/auth", () => () => ({
  id: mockUser.id,
  name: mockUser.name,
}));

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a getToken function returned from a useToken function", () => {
  const {
    result: { current: getToken },
  } = renderHook(useToken, { wrapper: Wrapper });
  describe("When called with a valid token in the localStorage", () => {
    test("Then it should log the user in", async () => {
      act(async () => {
        mockLocalStorage.setItem("token", "###");

        Object.defineProperty(window, "localStorage", {
          value: mockLocalStorage,
        });

        await getToken();
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          loadUserActionCreator(setUserBasicData(mockUser as IUser, "###"))
        );
      });

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserDataActionCreator(setUserExtraData(mockUser as IUser))
      );

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserDataActionCreator(setUserExtraData(mockUser as IUser))
      );

      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });

    test("Then it should dispatch the ui modal actions", async () => {
      act(async () => {
        mockLocalStorage.setItem("token", "###");

        Object.defineProperty(window, "localStorage", {
          value: mockLocalStorage,
        });

        await getToken();
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          setVisibilityActionCreator(true)
        );
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: "Log in successful",
            type: "success",
          })
        );
      });
    });

    test("Then it should redirect the user to '/home'", async () => {
      act(async () => {
        mockLocalStorage.setItem("token", "###");

        Object.defineProperty(window, "localStorage", {
          value: mockLocalStorage,
        });

        await getToken();
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/home");
      });
    });
  });
});

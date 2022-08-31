import { renderHook } from "@testing-library/react";
import { exec } from "child_process";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
  toggleStatusActionCreator,
} from "../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../store/slices/userData/userDataSlice";
import mockLocalStorage from "../test-utils/mocks/mockLocalStorage";
import mockUser from "../test-utils/mocks/mockUser";
import Wrapper from "../test-utils/render/Wrapper";
import { setUserBasicData, setUserExtraData } from "../utils/setUserData";
import useUser from "./useUser";

const signUpData = {
  name: mockUser.name,
  password: "password123",
  email: mockUser.email,
};

const mockUseDispatch = jest.fn();

jest.mock("../app/hooks", () => ({
  ...jest.requireActual("../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

jest.mock("../utils/auth", () => () => ({
  id: mockUser.id,
  name: mockUser.name,
}));

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

jest.mock("../test-utils/mocks/mockLocalStorage");

const axiosErrorMessage = "AxiosError: Request failed with status code 400";

describe("Given a signUp function returned by a useUser function", () => {
  describe("When called with valid sign up data", () => {
    test("Then it should return true and call the modal dispatch from the log in user", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      const result = await signUp(signUpData);

      expect(result).toBe(true);

      expect(mockUseDispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When called but the fetch fails", () => {
    test("Then it should return false and call the modal dispatch with error", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      const result = await signUp({ ...signUpData, password: "" });

      expect(result).toBe(false);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );

      expect(mockUseDispatch).toHaveBeenCalledWith(
        closeActionCreator({
          message: `Sign up error: ${axiosErrorMessage}`,
          type: "error",
        })
      );
    });
  });
});

describe("Given a logIn function returned by a useUser function", () => {
  const logInData = {
    name: mockUser.name,
    password: "password123",
  };

  describe("When called with valid log in data", () => {
    test("Then it should call the dispatch to mark the user as logged in and to log it in", async () => {
      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserActionCreator(setUserBasicData(mockUser, "#"))
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserDataActionCreator(setUserExtraData(mockUser))
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(
        toggleStatusActionCreator(true)
      );
    });

    test("Then it should also call the modal dispatch to show a success message", async () => {
      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(
        closeActionCreator({
          message: "Log in successful",
          type: "success",
        })
      );
    });

    test("Then it should set the received token at the local storage", async () => {
      const token = "#";

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", token);
    });
  });

  describe("When called but the fetch fails", () => {
    test("Then it should call the dispatch only to open the modal error", async () => {
      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn({ ...logInData, password: "" });

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );

      expect(mockUseDispatch).toHaveBeenCalledWith(
        closeActionCreator({
          message: `Log in error: ${axiosErrorMessage}`,
          type: "error",
        })
      );

      expect(mockUseDispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given a getUserData function returned by a useUser function", () => {
  describe(`When called with a user ID of ${mockUser.id}`, () => {
    test("Then it should return the user with said id", async () => {
      const {
        result: {
          current: { getUserData },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      const result = await getUserData(mockUser.id);

      expect(result).toStrictEqual(mockUser);
    });
  });

  describe("When called with a user id that doesn't exist, like 'falseId'", () => {
    test("Then it should not return a user", async () => {
      const fakeId = "falseId";
      const {
        result: {
          current: { getUserData },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      const result = await getUserData(fakeId);

      expect(result).toBe(undefined);
    });
  });
});

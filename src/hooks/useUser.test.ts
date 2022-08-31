import { renderHook } from "@testing-library/react";
import {
  signInActionCreator,
  toggleStatusActionCreator,
} from "../store/slices/userDataSlice";
import mockLocalStorage from "../test-utils/mocks/mockLocalStorage";
import mockUser from "../test-utils/mocks/mockUser";
import Wrapper from "../test-utils/render/Wrapper";
import useUser from "./useUser";

const signUpData = {
  name: "mockName",
  password: "mockPassword",
  email: "mockEmail",
};

let mockResolvedData: any = {
  data: { newUser: { ...signUpData, id: "userId", friends: ["friend"] } },
};

jest.mock("axios", () => ({
  post: () => mockResolvedData,
}));

const mockUseDispatch = jest.fn();

jest.mock("../app/hooks", () => ({
  ...jest.requireActual("../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

jest.mock("../utils/auth", () => () => ({
  getTokenData: jest.fn().mockReturnValue({
    id: mockUser.id,
    name: mockUser.name,
  }),
}));

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

jest.mock("../test-utils/mocks/mockLocalStorage");

describe("Given a signUp function returned by a useUser function", () => {
  describe("When called with valid sign up data", () => {
    test("Then it should call the dispatch with a sign up action creator", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await signUp(signUpData);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        signInActionCreator(mockResolvedData.data.newUser)
      );
    });
  });

  describe("When called but the fetch fails", () => {
    test("Then it should not call the dispatch", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });
      mockResolvedData = new Error();

      await signUp(signUpData);

      expect(mockUseDispatch).not.toHaveBeenCalled();
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
      mockResolvedData = {
        data: { user: { token: "###" } },
      };

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockUseDispatch).toHaveBeenCalledWith(toggleStatusActionCreator());
    });

    test("Then it should set the received token at the local storage", async () => {
      mockResolvedData = {
        data: { user: { token: "###" } },
      };

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "token",
        mockResolvedData.data.user.token
      );
    });
  });

  describe("When called but the fetch fails", () => {
    test("Then it should not call the dispatch", async () => {
      mockResolvedData = new Error();

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(logInData);

      expect(mockUseDispatch).not.toHaveBeenCalled();
    });
  });
});

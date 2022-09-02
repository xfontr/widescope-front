import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import routes from "../../configs/routes";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import {
  loadUserActionCreator,
  logOutActionCreator,
  toggleStatusActionCreator,
} from "../../store/slices/user/userSlice";
import { loadUserDataActionCreator } from "../../store/slices/userData/userDataSlice";
import mockLocalStorage from "../../test-utils/mocks/mockLocalStorage";
import mockUseDispatch from "../../test-utils/mocks/mockUseAppDispatch";
import mockUser from "../../test-utils/mocks/mockUser";
import { Wrapper } from "../../test-utils/render/Wrapper";
import { setUserBasicData, setUserExtraData } from "../../utils/setUserData";
import useUser from "./useUser";

const signUpData = {
  name: mockUser.name,
  password: "password123",
  email: mockUser.email,
};

jest.mock("../../utils/auth", () => () => ({
  id: mockUser.id,
  name: mockUser.name,
}));

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

jest.mock("../../test-utils/mocks/mockLocalStorage");

const mockNavigate = jest.fn().mockReturnThis();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const axiosErrorMessage = "AxiosError: Request failed with status code 400";

describe("Given a signUp function returned by a useUser function", () => {
  describe("When called with valid sign up data", () => {
    test("Then it should return true and call all the dispatches from the log in user", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      let result: boolean = false;

      act(async () => {
        result = await signUp(signUpData);
      });

      await waitFor(() => {
        expect(result).toBe(true);
      });

      expect(mockUseDispatch).toHaveBeenCalledTimes(6);
    });
  });

  describe("When called but the fetch fails", () => {
    const {
      result: {
        current: { signUp },
      },
    } = renderHook(useUser, { wrapper: Wrapper });

    test("Then it should return false and call the modal dispatch with error", async () => {
      let result: boolean = false;

      act(async () => {
        result = await signUp({ ...signUpData, password: "" });
      });

      await waitFor(() => {
        expect(result).toBe(false);
      });

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: `Sign up error: ${axiosErrorMessage}`,
            type: "error",
          })
        );
      });
    });
  });
});

describe("Given a logIn function returned by a useUser function", () => {
  const logInData = {
    name: mockUser.name,
    password: "password123",
  };

  describe("When called with valid log in data", () => {
    const {
      result: {
        current: { logIn },
      },
    } = renderHook(useUser, { wrapper: Wrapper });

    test("Then it should call the dispatch to mark the user as logged in and to log it in", async () => {
      act(async () => {
        await logIn(logInData);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          loadUserActionCreator(setUserBasicData(mockUser, "#"))
        );
      });

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadUserDataActionCreator(setUserExtraData(mockUser))
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(
        toggleStatusActionCreator(true)
      );
    });

    test("Then it should also call the modal dispatch to show a success message", async () => {
      act(async () => {
        await logIn(logInData);
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

    test("Then it should set the received token at the local storage", async () => {
      const token = "#";

      act(async () => {
        await logIn(logInData);
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", token);
      });
    });

    test(`Then it should redirect the user to the page ${routes.explore}`, async () => {
      act(async () => {
        await logIn(logInData);
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(routes.explore);
      });
    });
  });

  describe("When called but the fetch fails", () => {
    const {
      result: {
        current: { logIn },
      },
    } = renderHook(useUser, { wrapper: Wrapper });

    test("Then it should call the dispatch only to open the modal error", async () => {
      act(async () => {
        await logIn({ ...logInData, password: "" });
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          setVisibilityActionCreator(true)
        );
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: `Log in error: ${axiosErrorMessage}`,
            type: "error",
          })
        );
      });

      expect(mockUseDispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given a getUserData function returned by a useUser function", () => {
  const {
    result: {
      current: { getUserData },
    },
  } = renderHook(useUser, { wrapper: Wrapper });

  describe(`When called with a user ID of ${mockUser.id}`, () => {
    test("Then it should return the user with said id", async () => {
      const result = await getUserData(mockUser.id);

      expect(result).toStrictEqual(mockUser);
    });
  });

  describe("When called with a user id that doesn't exist, like 'falseId'", () => {
    test("Then it should not return a user", async () => {
      const fakeId = "falseId";

      const result = await getUserData(fakeId);

      expect(result).toBe(undefined);
    });
  });
});

describe("Given a logOut function returned by a useUser function", () => {
  const {
    result: {
      current: { logOut },
    },
  } = renderHook(useUser, { wrapper: Wrapper });

  describe(`When called`, () => {
    test("Then it should clear the local storage", () => {
      act(() => {
        logOut();
      });

      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });

    test("Then it should dispatch the log out action creator", () => {
      act(() => {
        logOut();
      });

      expect(mockUseDispatch).toHaveBeenCalledWith(logOutActionCreator());
    });

    test("Then it should redirect the user to the log in page", () => {
      act(() => {
        logOut();
      });

      expect(mockNavigate).toHaveBeenCalledWith(routes.logIn);
    });
  });
});

import { waitFor, renderHook as reactRenderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { navRoutes } from "../../configs/routes";
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
import mockContact from "../../test-utils/mocks/mockContact";
import mockLocalStorage from "../../test-utils/mocks/mockLocalStorage";
import mockUser from "../../test-utils/mocks/mockUser";
import { renderHook } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import {
  setUserBasicData,
  setUserExtraData,
} from "../../utils/setUserData/setUserData";
import useUser from "./useUser";

const signUpData = {
  name: mockUser.name,
  password: "password123",
  email: mockUser.email,
};

jest.mock("../../utils/auth/auth", () => () => ({
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

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a signUp function returned by a useUser function", () => {
  describe("When called with valid sign up data", () => {
    test("Then it should return true and call all the dispatches from the log in user", async () => {
      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser);

      let result: boolean = false;

      await act(async () => {
        result = await signUp(signUpData);
      });

      await waitFor(() => {
        expect(result).toBe(true);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledTimes(6);
      });
    });
  });

  describe("When called but the fetch fails", () => {
    const {
      result: {
        current: { signUp },
      },
    } = renderHook(useUser);

    test("Then it should return false and call the modal dispatch with error", async () => {
      let result: boolean = false;

      await act(async () => {
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
            message: "Sign up error",
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
    } = renderHook(useUser);

    test("Then it should call the dispatch to mark the user as logged in and to log it in", async () => {
      await act(async () => {
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
      await act(async () => {
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

      await act(async () => {
        await logIn(logInData);
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith("token", token);
      });
    });

    test(`Then it should redirect the user to the page ${navRoutes.explore.path}`, async () => {
      await act(async () => {
        await logIn(logInData);
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(navRoutes.explore.path);
      });
    });
  });

  describe("When called but the fetch fails", () => {
    const {
      result: {
        current: { logIn },
      },
    } = renderHook(useUser);

    test("Then it should call the dispatch only to open the modal error", async () => {
      await act(async () => {
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
            message: "Log in error",
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
  } = renderHook(useUser);

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
  } = renderHook(useUser);

  describe("When called", () => {
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

      expect(mockNavigate).toHaveBeenCalledWith(navRoutes.logIn.path);
    });
  });
});

describe("Given a addFriend function returned by a useUser function", () => {
  const {
    result: {
      current: { addFriend },
    },
  } = reactRenderHook(useUser, { wrapper: WrapperWithMockStore });

  describe("When called with a user id as an argument", () => {
    test("Then it should fetch the API to add a friend and close the modal with a success message", async () => {
      await addFriend(mockContact.id);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: "Friend added",
            type: "success",
          })
        );
      });
    });
  });

  describe("When called with a non-existant user id as an argument", () => {
    test("Then it should call the dispatch to close the modal with an error", async () => {
      await addFriend("wrongId");

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: "Couldn't add friend",
            type: "error",
          })
        );
      });
    });
  });
});

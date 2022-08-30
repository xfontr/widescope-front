import { renderHook } from "@testing-library/react";
import { signInActionCreator } from "../store/slices/userSlice";
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

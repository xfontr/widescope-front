import { renderHook } from "@testing-library/react";
import { SignInActionCreator } from "../store/slices/userSlice";
import Wrapper from "../test-utils/render/Wrapper";
import useUser from "./useUser";

const signUpData = {
  name: "mockName",
  password: "mockPassword",
  email: "mockEmail",
};

jest.mock("axios", () => ({
  post: () => ({
    data: { newUser: { ...signUpData, id: "userId", friends: ["friend"] } },
  }),
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

      const expectedResponse = {
        ...signUpData,
        id: "userId",
        friends: ["friend"],
      };

      expect(mockUseDispatch).toHaveBeenCalledWith(
        SignInActionCreator(expectedResponse)
      );
    });
  });
});

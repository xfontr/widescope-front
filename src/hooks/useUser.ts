import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  signInActionCreator,
  toggleStatusActionCreator,
} from "../store/slices/userDataSlice";
import mockUser from "../test-utils/mocks/mockUser";
import { UserLogInData, UserSignUpData } from "../types/user";
import getTokenData from "../utils/auth";
import { SignUpResponse, UserToken } from "./useUserTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();

  const signUp = useCallback(
    async ({ name, password, email }: UserSignUpData) => {
      try {
        const {
          data: { newUser },
        }: AxiosResponse<SignUpResponse> = await axios.post(
          `${apiUrl}/users/sign-up`,
          {
            name,
            password,
            email,
          }
        );

        dispatch(signInActionCreator(newUser));
      } catch (error) {}
    },
    [dispatch]
  );

  const logIn = useCallback(
    async ({ name, password }: UserLogInData) => {
      try {
        const {
          data: {
            user: { token },
          },
        }: AxiosResponse<UserToken> = await axios.post(
          `${apiUrl}/users/log-in`,
          {
            name,
            password,
          }
        );

        const tokenContent = getTokenData(token);

        dispatch(toggleStatusActionCreator());

        localStorage.setItem("token", token);

        dispatch(
          signInActionCreator({
            id: tokenContent.id,
            name: tokenContent.name,
            email: mockUser.email,
            friends: mockUser.friends,
          })
        );
      } catch (error) {}
    },
    [dispatch]
  );

  return { signUp, logIn };
};

export default useUser;
